import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, Sparkles, ArrowLeft, Calendar } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const selectedMassage = location.state?.selectedMassage || '';
  const supplementaryServices = location.state?.supplementaryServices || '';
  const totalDuration = location.state?.totalDuration || 0;
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-kryzalid-cream to-white">
      {/* Header */}
      <section className="py-8 px-4 bg-gradient-to-br from-kryzalid-pink to-kryzalid-lavender">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-kryzalid-charcoal hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl md:text-4xl font-cursive text-kryzalid-charcoal text-center">
            Réserver Votre Massage
          </h1>
          <div className="w-16 h-1 bg-kryzalid-rose mx-auto mt-4"></div>
        </div>
      </section>

      {/* Booking Summary - Only show if service selected */}
      {selectedMassage && (
        <section className="py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-kryzalid-rose shadow-xl mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-cursive text-kryzalid-charcoal mb-4">
                  Récapitulatif
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-kryzalid-charcoal font-medium">{selectedMassage}</span>
                  </div>
                  
                  {supplementaryServices && (
                    <div className="text-sm text-kryzalid-grey">
                      + {supplementaryServices}
                    </div>
                  )}
                  
                  <div className="border-t border-kryzalid-cream pt-3 mt-3 grid grid-cols-2 gap-4">
                    <div className="bg-kryzalid-cream/50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-kryzalid-grey text-sm mb-1">
                        <Clock className="h-4 w-4" />
                        Durée
                      </div>
                      <span className="text-2xl font-bold text-kryzalid-charcoal">
                        {totalDuration} min
                      </span>
                    </div>
                    
                    <div className="bg-kryzalid-rose/10 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-kryzalid-grey text-sm mb-1">
                        <Sparkles className="h-4 w-4" />
                        Prix
                      </div>
                      <span className="text-2xl font-bold text-kryzalid-rose">
                        CHF {totalPrice}.-
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Agenda.ch Booking Widget */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-kryzalid-rose shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-kryzalid-pink to-kryzalid-lavender p-4 text-center">
                <h3 className="text-xl font-cursive text-kryzalid-charcoal flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5 text-kryzalid-rose" />
                  Sélectionnez votre créneau
                </h3>
              </div>
              
              {/* Agenda.ch Iframe */}
              <div className="w-full bg-white">
                <iframe
                  src="https://book.agenda.ch?companyId=18878"
                  title="Réservation Institut Kryzalid"
                  className="w-full border-0"
                  style={{ 
                    minHeight: '800px',
                    height: '100vh',
                    maxHeight: '1200px'
                  }}
                  allow="payment"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 px-4 bg-gradient-to-br from-kryzalid-rose/20 to-kryzalid-lavender/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-kryzalid-grey mb-4">
            Besoin d'aide pour réserver?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+41784440101">
              <Button variant="outline" className="border-kryzalid-rose text-kryzalid-rose hover:bg-kryzalid-pink">
                +41 78 444 01 01
              </Button>
            </a>
            <a 
              href="https://wa.me/41784440101?text=Bonjour,%20je%20souhaite%20prendre%20rendez-vous%20pour%20un%20massage."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-kryzalid-rose text-kryzalid-rose hover:bg-kryzalid-pink">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
