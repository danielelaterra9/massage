"""
Google Calendar Integration for Kryzalid Massage Booking System
"""
from datetime import datetime, timedelta
from typing import List, Optional
import os
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scopes required for Google Calendar API
SCOPES = ['https://www.googleapis.com/auth/calendar']

class GoogleCalendarService:
    def __init__(self):
        self.service = None
        self.calendar_id = os.environ.get('GOOGLE_CALENDAR_ID', 'primary')
        self._initialize_service()
    
    def _initialize_service(self):
        """Initialize Google Calendar service with service account credentials"""
        credentials_json = os.environ.get('GOOGLE_CALENDAR_CREDENTIALS')
        
        if not credentials_json:
            print("WARNING: GOOGLE_CALENDAR_CREDENTIALS not set. Calendar integration disabled.")
            return
        
        try:
            credentials_info = json.loads(credentials_json)
            credentials = service_account.Credentials.from_service_account_info(
                credentials_info, scopes=SCOPES
            )
            self.service = build('calendar', 'v3', credentials=credentials)
            print("Google Calendar service initialized successfully")
        except Exception as e:
            print(f"Error initializing Google Calendar service: {e}")
            self.service = None
    
    def is_configured(self) -> bool:
        """Check if Google Calendar is properly configured"""
        return self.service is not None
    
    def get_available_slots(
        self,
        date: str,
        duration_minutes: int,
        start_hour: int = 9,
        end_hour: int = 19,
        slot_interval: int = 15
    ) -> List[dict]:
        """
        Get available time slots for a specific date
        
        Args:
            date: Date in format YYYY-MM-DD
            duration_minutes: Duration of the appointment in minutes
            start_hour: Start of working hours (default 9)
            end_hour: End of working hours (default 19)
            slot_interval: Interval between slots in minutes (default 15)
        
        Returns:
            List of available slots with start and end times
        """
        if not self.service:
            # Return mock data if not configured
            return self._get_mock_slots(date, duration_minutes, start_hour, end_hour, slot_interval)
        
        try:
            # Parse the date
            target_date = datetime.strptime(date, '%Y-%m-%d')
            
            # Set time range for the day
            time_min = target_date.replace(hour=start_hour, minute=0, second=0)
            time_max = target_date.replace(hour=end_hour, minute=0, second=0)
            
            # Get busy times from Google Calendar
            body = {
                "timeMin": time_min.isoformat() + 'Z',
                "timeMax": time_max.isoformat() + 'Z',
                "items": [{"id": self.calendar_id}]
            }
            
            freebusy_result = self.service.freebusy().query(body=body).execute()
            busy_times = freebusy_result.get('calendars', {}).get(self.calendar_id, {}).get('busy', [])
            
            # Convert busy times to datetime objects
            busy_periods = []
            for busy in busy_times:
                start = datetime.fromisoformat(busy['start'].replace('Z', '+00:00'))
                end = datetime.fromisoformat(busy['end'].replace('Z', '+00:00'))
                busy_periods.append((start.replace(tzinfo=None), end.replace(tzinfo=None)))
            
            # Generate available slots
            available_slots = []
            current_time = time_min
            
            while current_time + timedelta(minutes=duration_minutes) <= time_max:
                slot_end = current_time + timedelta(minutes=duration_minutes)
                
                # Check if slot overlaps with any busy period
                is_available = True
                for busy_start, busy_end in busy_periods:
                    if not (slot_end <= busy_start or current_time >= busy_end):
                        is_available = False
                        break
                
                if is_available:
                    available_slots.append({
                        "start": current_time.strftime('%H:%M'),
                        "end": slot_end.strftime('%H:%M'),
                        "datetime": current_time.isoformat()
                    })
                
                current_time += timedelta(minutes=slot_interval)
            
            return available_slots
            
        except HttpError as e:
            print(f"Google Calendar API error: {e}")
            return []
        except Exception as e:
            print(f"Error getting available slots: {e}")
            return []
    
    def _get_mock_slots(
        self,
        date: str,
        duration_minutes: int,
        start_hour: int,
        end_hour: int,
        slot_interval: int
    ) -> List[dict]:
        """Generate mock slots when Google Calendar is not configured"""
        target_date = datetime.strptime(date, '%Y-%m-%d')
        
        # Don't show slots for past dates
        if target_date.date() < datetime.now().date():
            return []
        
        available_slots = []
        current_time = target_date.replace(hour=start_hour, minute=0, second=0)
        time_max = target_date.replace(hour=end_hour, minute=0, second=0)
        
        while current_time + timedelta(minutes=duration_minutes) <= time_max:
            slot_end = current_time + timedelta(minutes=duration_minutes)
            available_slots.append({
                "start": current_time.strftime('%H:%M'),
                "end": slot_end.strftime('%H:%M'),
                "datetime": current_time.isoformat()
            })
            current_time += timedelta(minutes=slot_interval)
        
        return available_slots
    
    def create_booking(
        self,
        start_datetime: str,
        duration_minutes: int,
        customer_name: str,
        customer_email: str,
        customer_phone: str,
        service_name: str,
        supplementary_services: str,
        total_price: float
    ) -> Optional[dict]:
        """
        Create a booking in Google Calendar
        
        Returns:
            Created event details or None if failed
        """
        # Parse start time
        start = datetime.fromisoformat(start_datetime)
        end = start + timedelta(minutes=duration_minutes)
        
        # Build event description
        description = f"""
RÉSERVATION MASSAGE - Institut Kryzalid

Client: {customer_name}
Email: {customer_email}
Téléphone: {customer_phone}

Service: {service_name}
{f'Services supplémentaires: {supplementary_services}' if supplementary_services else ''}

Durée totale: {duration_minutes} minutes
Prix total: CHF {total_price}.-

---
Réservation effectuée via le site web
        """.strip()
        
        event = {
            'summary': f'Massage - {customer_name} ({duration_minutes} min)',
            'description': description,
            'start': {
                'dateTime': start.isoformat(),
                'timeZone': 'Europe/Zurich',
            },
            'end': {
                'dateTime': end.isoformat(),
                'timeZone': 'Europe/Zurich',
            },
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 60},
                ],
            },
        }
        
        if not self.service:
            # Return mock response if not configured
            print(f"MOCK BOOKING: {event}")
            return {
                "id": "mock_event_id",
                "status": "confirmed",
                "summary": event['summary'],
                "start": event['start'],
                "end": event['end'],
                "mock": True
            }
        
        try:
            created_event = self.service.events().insert(
                calendarId=self.calendar_id,
                body=event
            ).execute()
            
            print(f"Event created: {created_event.get('htmlLink')}")
            return created_event
            
        except HttpError as e:
            print(f"Google Calendar API error: {e}")
            return None
        except Exception as e:
            print(f"Error creating booking: {e}")
            return None


# Global instance
calendar_service = GoogleCalendarService()
