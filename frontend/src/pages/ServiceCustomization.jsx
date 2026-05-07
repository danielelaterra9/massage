import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Calendar, Plus, Check, Clock, Sparkles } from 'lucide-react';

// Servizi supplementari disponibili
const supplementaryServices = [
  {
    id: 'cuir-chevelu',
    name: 'Massage du cuir chevelu',
    duration: 10,
    price: 15,
    description: 'Massage relaxant du cuir chevelu'
  },
  {
    id: 'visage',
    name: 'Massage du visage',
    duration: 10,
    price: 15,
    description: 'Massage détente du visage'
  },
  {
    id: 'cuir-chevelu-visage',
    name: 'Cuir chevelu et visage combiné',
    duration: 15,
    price: 20,
    description: 'Massage complet du cuir chevelu et du visage'
  },
  {
    id: 'exfoliation-pieds',
    name: 'Exfoliation des pieds et massage avec crème nourrissante',
    duration: 20,
    price: 30,
    description: 'Soin complet des pieds avec exfoliation et massage hydratant'
  }
];

const ServiceCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const selectedService = location.state?.selectedService || {};
  const [selectedSupplementary, setSelectedSupplementary] = useState([]);
  
  useEffect(() => {
    // Si pas de service sélectionné, rediriger vers massages
    if (!selectedService.name) {
      navigate('/massages');
    }
  }, [selectedService, navigate]);

  // Calcul du prix total
  const calculateTotal = () => {
    const basePrice = parseFloat(selectedService.price?.replace('CHF ', '') || 0);
    const supplementaryPrice = selectedSupplementary.reduce((sum, id) => {
      const service = supplementaryServices.find(s => s.id === id);
      return sum + (service?.price || 0);
    }, 0);
    return basePrice + supplementaryPrice;
  };

  // Calcul de la durée totale (sans buffer)
  const calculateDuration = () => {
    const baseDuration = parseInt(selectedService.duration?.replace(' minutes', '') || 0);
    const supplementaryDuration = selectedSupplementary.reduce((sum, id) => {
      const service = supplementaryServices.find(s => s.id === id);
      return sum + (service?.duration || 0);
    }, 0);
    return baseDuration + supplementaryDuration;
  };

  // Calcul de la durée pour Calendly (en slots de 45 minutes)
  const calculateCalendlyDuration = () => {
    const totalDuration = calculateDuration();
    // Chaque slot est de 45 minutes
    const slots = Math.ceil(totalDuration / 45);
    return slots * 45;
  };
  
  // Calcul du nombre de slots
  const calculateSlots = () => {
    const totalDuration = calculateDuration();
    return Math.ceil(totalDuration / 45);
  };

  const toggleSupplementary = (id) => {
    setSelectedSupplementary(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleConfirm = () => {
    const totalDuration = calculateDuration();
    const calendlyDuration = calculateCalendlyDuration();
    const slots = calculateSlots();
    const supplementaryNames = selectedSupplementary.map(id => {
      const service = supplementaryServices.find(s => s.id === id);
      return service?.name;
    }).join(', ');

    // Naviguer vers la page de réservation avec toutes les infos
    navigate('/reservation', {
      state: {
        selectedMassage: selectedService.name,
        supplementaryServices: supplementaryNames,
        totalDuration: totalDuration,
        calendlyDuration: calendlyDuration,
        slots: slots,
        totalPrice: calculateTotal(),
        basePrice: parseFloat(selectedService.price?.replace('CHF ', '') || 0)
      }
    });
  };

  if (!selectedService.name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kryzalid-cream to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Service sélectionné - Récapitulatif compact */}
        <Card className="mb-8 border-kryzalid-rose border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-kryzalid-pink to-kryzalid-lavender py-4">
            <CardTitle className="text-xl font-cursive text-kryzalid-charcoal flex items-center gap-3">
              <Check className="h-5 w-5 text-kryzalid-rose" />
              Votre soin sélectionné
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-cursive text-kryzalid-charcoal">
                  {selectedService.name}
                </h3>
                <div className="flex gap-4 text-sm text-kryzalid-grey mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedService.duration}
                  </span>
                  <span className="font-semibold text-kryzalid-rose">{selectedService.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Titre principal pour services supplémentaires */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-cursive text-kryzalid-charcoal mb-4 leading-relaxed">
            Vous voulez prolonger ce moment de bien-être ?
          </h1>
          <p className="text-xl text-kryzalid-charcoal font-serif">
            Choisissez un ou plusieurs services à rajouter à votre soin :
          </p>
          <div className="w-24 h-1 bg-kryzalid-rose mx-auto mt-6"></div>
        </div>

        {/* Services supplémentaires */}
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {supplementaryServices.map((service) => (
              <Card 
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedSupplementary.includes(service.id) 
                    ? 'border-kryzalid-rose border-2 bg-kryzalid-pink' 
                    : 'border-kryzalid-cream hover:border-kryzalid-rose'
                }`}
                onClick={() => toggleSupplementary(service.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Checkbox
                        checked={selectedSupplementary.includes(service.id)}
                        onCheckedChange={() => toggleSupplementary(service.id)}
                        className="border-kryzalid-rose data-[state=checked]:bg-kryzalid-rose"
                        data-testid={`checkbox-${service.id}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-cursive text-kryzalid-charcoal mb-1 flex items-center gap-2">
                        <Plus className="h-4 w-4 text-kryzalid-rose" />
                        {service.name}
                      </h3>
                      <div className="flex justify-between items-center text-sm mt-3">
                        <span className="text-kryzalid-grey flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.duration} min.
                        </span>
                        <span className="font-semibold text-kryzalid-rose text-lg">CHF {service.price}.-</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Récapitulatif */}
        <Card className="mb-8 shadow-2xl border-kryzalid-rose" data-testid="recap-card">
          <CardHeader className="bg-gradient-to-r from-kryzalid-lavender to-kryzalid-pink">
            <CardTitle className="text-2xl font-cursive text-kryzalid-charcoal flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Récapitulatif de votre séance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Service principal */}
              <div className="flex justify-between items-center pb-3 border-b border-kryzalid-cream">
                <div>
                  <span className="text-kryzalid-charcoal font-medium">{selectedService.name}</span>
                  <span className="text-sm text-kryzalid-grey ml-2">({selectedService.duration})</span>
                </div>
                <span className="font-semibold text-kryzalid-charcoal">{selectedService.price}</span>
              </div>
              
              {/* Services supplémentaires */}
              {selectedSupplementary.length > 0 && (
                <>
                  <div className="space-y-3">
                    {selectedSupplementary.map(id => {
                      const service = supplementaryServices.find(s => s.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-kryzalid-grey">{service?.name}</span>
                            <span className="text-kryzalid-grey ml-2">({service?.duration} min)</span>
                          </div>
                          <span className="text-kryzalid-charcoal">+CHF {service?.price}.-</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-kryzalid-cream pt-3"></div>
                </>
              )}
              
              {/* Durée totale */}
              <div className="flex justify-between items-center bg-kryzalid-cream/50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-kryzalid-rose" />
                  <span className="text-kryzalid-charcoal font-medium">Durée totale du soin</span>
                </div>
                <span className="text-xl font-bold text-kryzalid-charcoal" data-testid="total-duration">
                  {calculateDuration()} minutes
                </span>
              </div>
              
              {/* Prix total */}
              <div className="flex justify-between items-center bg-kryzalid-rose/10 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-kryzalid-rose" />
                  <span className="text-kryzalid-charcoal font-medium">Prix total à régler sur place</span>
                </div>
                <span className="text-2xl font-bold text-kryzalid-rose" data-testid="total-price">
                  CHF {calculateTotal()}.-
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/massages')}
            className="border-2 border-kryzalid-rose text-kryzalid-charcoal hover:bg-kryzalid-pink px-8 py-6 rounded-full font-medium"
          >
            Retour aux Massages
          </Button>
          <Button
            size="lg"
            onClick={handleConfirm}
            className="bg-kryzalid-rose hover:bg-opacity-80 text-white px-12 py-6 rounded-full shadow-xl font-medium"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Confirmer et Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCustomization;
