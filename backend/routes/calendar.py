"""
Calendar booking routes for Kryzalid Massage
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from google_calendar import calendar_service

router = APIRouter(prefix="/calendar")

class AvailableSlotsRequest(BaseModel):
    date: str  # Format: YYYY-MM-DD
    duration_minutes: int

class BookingRequest(BaseModel):
    start_datetime: str  # ISO format
    duration_minutes: int
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    service_name: str
    supplementary_services: Optional[str] = ""
    total_price: float

class SlotResponse(BaseModel):
    start: str
    end: str
    datetime: str

class CalendarStatusResponse(BaseModel):
    configured: bool
    message: str

@router.get("/status", response_model=CalendarStatusResponse)
async def get_calendar_status():
    """Check if Google Calendar is configured"""
    is_configured = calendar_service.is_configured()
    return {
        "configured": is_configured,
        "message": "Google Calendar connecté" if is_configured else "Google Calendar non configuré - Mode démonstration actif"
    }

@router.post("/available-slots", response_model=List[SlotResponse])
async def get_available_slots(request: AvailableSlotsRequest):
    """
    Get available time slots for a specific date and duration
    """
    # Validate date format
    try:
        date_obj = datetime.strptime(request.date, '%Y-%m-%d')
    except ValueError:
        raise HTTPException(status_code=400, detail="Format de date invalide. Utilisez YYYY-MM-DD")
    
    # Validate duration
    if request.duration_minutes < 15 or request.duration_minutes > 180:
        raise HTTPException(status_code=400, detail="Durée invalide (15-180 minutes)")
    
    # Get available slots
    slots = calendar_service.get_available_slots(
        date=request.date,
        duration_minutes=request.duration_minutes,
        start_hour=9,  # Working hours start at 9:00
        end_hour=19,   # Working hours end at 19:00
        slot_interval=15  # 15-minute intervals
    )
    
    return slots

@router.post("/book")
async def create_booking(request: BookingRequest):
    """
    Create a new booking in Google Calendar
    """
    # Validate required fields
    if not request.customer_name or not request.customer_email or not request.customer_phone:
        raise HTTPException(status_code=400, detail="Tous les champs sont obligatoires")
    
    # Create the booking
    result = calendar_service.create_booking(
        start_datetime=request.start_datetime,
        duration_minutes=request.duration_minutes,
        customer_name=request.customer_name,
        customer_email=request.customer_email,
        customer_phone=request.customer_phone,
        service_name=request.service_name,
        supplementary_services=request.supplementary_services,
        total_price=request.total_price
    )
    
    if result is None:
        raise HTTPException(status_code=500, detail="Erreur lors de la création de la réservation")
    
    return {
        "success": True,
        "message": "Réservation confirmée!",
        "booking": {
            "id": result.get("id"),
            "start": request.start_datetime,
            "duration": request.duration_minutes,
            "service": request.service_name,
            "price": request.total_price
        },
        "mock": result.get("mock", False)
    }

@router.get("/working-hours")
async def get_working_hours():
    """Get working hours configuration"""
    return {
        "start_hour": 9,
        "end_hour": 19,
        "slot_interval": 15,
        "timezone": "Europe/Zurich",
        "working_days": [1, 2, 3, 4, 5, 6]  # Monday to Saturday
    }
