import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Calendar, Plus, Check } from 'lucide-react';

// Servizi supplementari disponibili
const supplementaryServices = [
  {
    id: 'gommage',
    name: 'Gommage Express',
    duration: 15,
    price: 25,
    description: 'Gommage rapide pour une peau douce'
  },
  {
    id: 'aromatherapie',
    name: 'Aromathérapie',
    duration: 0,
    price: 15,
    description: 'Huiles essentielles personnalisées'
  },
  {
    id: 'reflexologie',
    name: 'Réflexologie Pieds (15 min)',
    duration: 15,
    price: 30,
    description: 'Massage réflexologie des pieds'
  },
  {
    id: 'craniofacial',
    name: 'Massage Cranio-Facial',
    duration: 10,
    price: 20,
    description: 'Détente du visage et du crâne'
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

  // Calcul de la durée totale
  const calculateDuration = () => {
    const baseDuration = parseInt(selectedService.duration?.replace(' minutes', '') || 0);
    const supplementaryDuration = selectedSupplementary.reduce((sum, id) => {
      const service = supplementaryServices.find(s => s.id === id);
      return sum + (service?.duration || 0);
    }, 0);
    // Ajouter 15 minutes de buffer
    return baseDuration + supplementaryDuration + 15;
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
        totalPrice: calculateTotal()
      }
    });
  };

  if (!selectedService.name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kryzalid-cream to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-cursive text-kryzalid-charcoal mb-4">
            Personnalisez Votre Séance
          </h1>
          <div className="w-24 h-1 bg-kryzalid-rose mx-auto mb-6"></div>
          <p className="text-lg text-kryzalid-grey">
            Ajoutez des soins complémentaires pour une expérience encore plus complète
          </p>
        </div>

        {/* Service sélectionné */}
        <Card className="mb-8 border-kryzalid-rose border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-kryzalid-pink to-kryzalid-lavender">
            <CardTitle className="text-2xl font-cursive text-kryzalid-charcoal flex items-center gap-3">
              <Check className="h-6 w-6 text-kryzalid-rose" />
              Service Sélectionné
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-cursive text-kryzalid-charcoal mb-2">
                  {selectedService.name}
                </h3>
                <p className="text-kryzalid-grey mb-2">{selectedService.description}</p>
                <div className="flex gap-4 text-sm text-kryzalid-grey">
                  <span>⏱️ {selectedService.duration}</span>
                  <span className="font-semibold text-kryzalid-rose">{selectedService.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services supplémentaires */}
        <div className="mb-8">
          <h2 className="text-3xl font-cursive text-kryzalid-charcoal mb-6">
            Services Complémentaires
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supplementaryServices.map((service) => (
              <Card 
                key={service.id}
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
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-cursive text-kryzalid-charcoal mb-1 flex items-center gap-2">
                        <Plus className="h-4 w-4 text-kryzalid-rose" />
                        {service.name}
                      </h3>
                      <p className="text-sm text-kryzalid-grey mb-3">{service.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-kryzalid-grey">
                          {service.duration > 0 ? `+${service.duration} min` : 'Inclus dans la durée'}
                        </span>
                        <span className="font-semibold text-kryzalid-rose">+CHF {service.price}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Récapitulatif */}
        <Card className="mb-8 shadow-2xl border-kryzalid-rose">
          <CardHeader className="bg-gradient-to-r from-kryzalid-lavender to-kryzalid-pink">
            <CardTitle className="text-2xl font-cursive text-kryzalid-charcoal">
              Récapitulatif
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-kryzalid-cream">
                <span className="text-kryzalid-charcoal">Service principal</span>
                <span className="font-semibold text-kryzalid-charcoal">{selectedService.price}</span>
              </div>
              
              {selectedSupplementary.length > 0 && (
                <>
                  <div className="space-y-2">
                    {selectedSupplementary.map(id => {
                      const service = supplementaryServices.find(s => s.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center text-sm">
                          <span className="text-kryzalid-grey">{service?.name}</span>
                          <span className="text-kryzalid-charcoal">+CHF {service?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-kryzalid-cream pt-2"></div>
                </>
              )}
              
              <div className="flex justify-between items-center text-xl font-cursive">
                <span className="text-kryzalid-charcoal">Total</span>
                <span className="text-kryzalid-rose font-bold">CHF {calculateTotal()}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-kryzalid-grey pt-2 border-t border-kryzalid-cream">
                <span>Durée totale (avec temps de préparation)</span>
                <span className="font-semibold">{calculateDuration()} minutes</span>
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
