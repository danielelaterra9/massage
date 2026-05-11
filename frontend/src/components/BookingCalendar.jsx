import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const BookingCalendar = ({ 
  durationMinutes, 
  serviceName, 
  supplementaryServices, 
  totalPrice,
  onSlotSelected,
  onBookingComplete 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState('calendar'); // 'calendar', 'form', 'confirmation'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState({ configured: false, message: '' });

  // Get calendar status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/calendar/status`);
        const data = await response.json();
        setCalendarStatus(data);
      } catch (error) {
        console.error('Error checking calendar status:', error);
      }
    };
    checkStatus();
  }, []);

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  // Check if a date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Check if it's a working day (Monday-Saturday)
  const isWorkingDay = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 6; // Monday = 1, Saturday = 6
  };

  // Format date for API
  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Fetch available slots for selected date
  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    setAvailableSlots([]);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/calendar/available-slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formatDateForAPI(date),
          duration_minutes: durationMinutes
        })
      });
      
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (!date || isPastDate(date) || !isWorkingDay(date)) return;
    
    setSelectedDate(date);
    setSelectedSlot(null);
    fetchAvailableSlots(date);
  };

  // Handle slot selection
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    if (onSlotSelected) {
      onSlotSelected(slot);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedSlot || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/calendar/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_datetime: selectedSlot.datetime,
          duration_minutes: durationMinutes,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          service_name: serviceName,
          supplementary_services: supplementaryServices,
          total_price: totalPrice
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setBookingStep('confirmation');
        if (onBookingComplete) {
          onBookingComplete(result);
        }
      } else {
        alert(result.detail || 'Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const days = getDaysInMonth(currentDate);

  // Confirmation step
  if (bookingStep === 'confirmation') {
    return (
      <Card className="border-2 border-green-500 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-cursive text-kryzalid-charcoal mb-2">
            Réservation Confirmée!
          </h3>
          <p className="text-kryzalid-grey mb-4">
            Votre rendez-vous a été enregistré avec succès.
          </p>
          <div className="bg-white rounded-lg p-4 text-left space-y-2">
            <p><strong>Service:</strong> {serviceName}</p>
            {supplementaryServices && <p><strong>Extras:</strong> {supplementaryServices}</p>}
            <p><strong>Date:</strong> {selectedDate?.toLocaleDateString('fr-CH')}</p>
            <p><strong>Heure:</strong> {selectedSlot?.start} - {selectedSlot?.end}</p>
            <p><strong>Durée:</strong> {durationMinutes} minutes</p>
            <p><strong>Prix:</strong> CHF {totalPrice}.-</p>
          </div>
          <p className="text-sm text-kryzalid-grey mt-4">
            Un email de confirmation vous sera envoyé.
          </p>
          {calendarStatus.configured === false && (
            <p className="text-xs text-amber-600 mt-2">
              (Mode démonstration - aucun email envoyé)
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Form step
  if (bookingStep === 'form') {
    return (
      <Card className="border-2 border-kryzalid-rose">
        <CardContent className="p-6">
          <h3 className="text-xl font-cursive text-kryzalid-charcoal mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-kryzalid-rose" />
            Vos Coordonnées
          </h3>
          
          <div className="bg-kryzalid-cream/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-kryzalid-charcoal">
              <strong>{serviceName}</strong>
              {supplementaryServices && <span> + {supplementaryServices}</span>}
            </p>
            <p className="text-sm text-kryzalid-grey">
              {selectedDate?.toLocaleDateString('fr-CH')} à {selectedSlot?.start} ({durationMinutes} min)
            </p>
            <p className="text-lg font-semibold text-kryzalid-rose mt-1">CHF {totalPrice}.-</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kryzalid-charcoal mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-4 py-2 border border-kryzalid-cream rounded-lg focus:ring-2 focus:ring-kryzalid-rose focus:border-transparent"
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-kryzalid-charcoal mb-1">
                Email *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full px-4 py-2 border border-kryzalid-cream rounded-lg focus:ring-2 focus:ring-kryzalid-rose focus:border-transparent"
                placeholder="votre@email.ch"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-kryzalid-charcoal mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-4 py-2 border border-kryzalid-cream rounded-lg focus:ring-2 focus:ring-kryzalid-rose focus:border-transparent"
                placeholder="+41 79 123 45 67"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setBookingStep('calendar')}
              className="flex-1 border-kryzalid-rose text-kryzalid-rose hover:bg-kryzalid-pink"
            >
              Retour
            </Button>
            <Button
              onClick={handleBooking}
              disabled={bookingLoading || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
              className="flex-1 bg-kryzalid-rose hover:bg-kryzalid-rose/80 text-white"
            >
              {bookingLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Réservation...</>
              ) : (
                'Confirmer la Réservation'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calendar step
  return (
    <div className="space-y-6">
      {/* Calendar Status */}
      {!calendarStatus.configured && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-center">
          <p className="text-amber-700 text-sm">{calendarStatus.message}</p>
        </div>
      )}

      {/* Calendar */}
      <Card className="border-2 border-kryzalid-rose">
        <CardContent className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-kryzalid-pink rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-kryzalid-charcoal" />
            </button>
            <h3 className="text-xl font-cursive text-kryzalid-charcoal">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-kryzalid-pink rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-kryzalid-charcoal" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-kryzalid-grey py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={index} className="aspect-square" />;
              }
              
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              const isPast = isPastDate(date);
              const isWorking = isWorkingDay(date);
              const isDisabled = isPast || !isWorking;
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isDisabled}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                    ${isSelected 
                      ? 'bg-kryzalid-rose text-white' 
                      : isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-kryzalid-pink text-kryzalid-charcoal'
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-kryzalid-grey text-center mt-3">
            Ouvert du lundi au samedi
          </p>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card className="border-2 border-kryzalid-lavender">
          <CardContent className="p-4">
            <h4 className="text-lg font-cursive text-kryzalid-charcoal mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-kryzalid-rose" />
              Créneaux disponibles - {selectedDate.toLocaleDateString('fr-CH')}
            </h4>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-kryzalid-rose" />
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotClick(slot)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${selectedSlot?.start === slot.start
                        ? 'bg-kryzalid-rose text-white'
                        : 'bg-kryzalid-cream hover:bg-kryzalid-pink text-kryzalid-charcoal'
                      }
                    `}
                  >
                    {slot.start}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-kryzalid-grey py-4">
                Aucun créneau disponible pour cette date
              </p>
            )}

            {selectedSlot && (
              <div className="mt-4 pt-4 border-t border-kryzalid-cream">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-kryzalid-grey">Créneau sélectionné:</p>
                    <p className="font-semibold text-kryzalid-charcoal">
                      {selectedSlot.start} - {selectedSlot.end} ({durationMinutes} min)
                    </p>
                  </div>
                  <Button
                    onClick={() => setBookingStep('form')}
                    className="bg-kryzalid-rose hover:bg-kryzalid-rose/80 text-white"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingCalendar;
