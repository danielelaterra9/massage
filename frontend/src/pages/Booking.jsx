import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Calendar, Clock, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { CALENDLY_CONFIG, isCalendlyConfigured, getCalendlyUrlForDuration } from '../config/calendly';

const Booking = () => {
  const location = useLocation();
  const selectedMassage = location.state?.selectedMassage || '';
  const supplementaryServices = location.state?.supplementaryServices || '';
  const totalDuration = location.state?.totalDuration || 0;
  const calendlyDuration = location.state?.calendlyDuration || totalDuration + 15;
  const totalPrice = location.state?.totalPrice || 0;
  
  // Get the specific Calendly URL based on total duration
  const calendlyUrl = getCalendlyUrlForDuration(calendlyDuration);
  const isConfigured = isCalendlyConfigured();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build the description for Calendly prefill
  const bookingDescription = `${selectedMassage}${supplementaryServices ? ' + ' + supplementaryServices : ''} - Durée: ${totalDuration} min - Prix: CHF ${totalPrice}.-`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-kryzalid-cream to-white">
      {/* Hero Section - Compact */}
      <section className="py-8 px-4 bg-gradient-to-br from-kryzalid-pink to-kryzalid-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-cursive text-kryzalid-charcoal mb-2">
            Choisissez Votre Créneau
          </h1>
          <div className="w-16 h-1 bg-kryzalid-rose mx-auto"></div>
        </div>
      </section>

      {/* Récapitulatif COMPACT et CLAIR */}
      {selectedMassage && (
        <section className="py-6 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Box principal avec durée et prix */}
            <div className="bg-gradient-to-r from-kryzalid-rose to-kryzalid-lavender rounded-2xl p-6 shadow-xl text-center mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Durée */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-white" />
                    <span className="text-white/90 font-medium">DURÉE À RÉSERVER</span>
                  </div>
                  <span className="text-5xl font-bold text-white" data-testid="booking-duration">
                    {totalDuration}
                  </span>
                  <span className="text-2xl text-white ml-2">minutes</span>
                </div>
                
                {/* Prix */}
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 text-white" />
                    <span className="text-white/90 font-medium">PRIX TOTAL</span>
                  </div>
                  <span className="text-5xl font-bold text-white" data-testid="booking-price">
                    {totalPrice}
                  </span>
                  <span className="text-2xl text-white ml-2">CHF</span>
                </div>
              </div>
              
              {/* Détails */}
              <div className="mt-4 text-white/90 text-sm">
                <p><strong>{selectedMassage}</strong></p>
                {supplementaryServices && <p className="mt-1">+ {supplementaryServices}</p>}
              </div>
            </div>

            {/* Message d'instruction */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 flex items-center gap-4 mb-6">
              <AlertCircle className="h-8 w-8 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-semibold">
                  Sélectionnez un créneau de <span className="text-xl">{totalDuration} minutes</span> dans le calendrier ci-dessous
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  Le paiement de CHF {totalPrice}.- se fait sur place
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Calendly Widget Section */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl border-none overflow-hidden">
            <CardContent className="p-0">
              {/* Calendly Inline Widget */}
              <div className="calendly-container bg-white" style={{ minHeight: '650px' }}>
                {isConfigured ? (
                  <InlineWidget
                    url={calendlyUrl}
                    pageSettings={{
                      ...CALENDLY_CONFIG.PAGE_SETTINGS,
                      hideEventTypeDetails: true,
                      hideLandingPageDetails: true,
                    }}
                    prefill={{
                      name: '',
                      email: '',
                      customAnswers: {
                        a1: bookingDescription
                      }
                    }}
                    styles={{
                      height: '650px',
                      width: '100%'
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full p-12 bg-kryzalid-cream/50">
                    <div className="text-center max-w-xl">
                      <div className="w-20 h-20 bg-kryzalid-lavender rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-10 w-10 text-kryzalid-rose" />
                      </div>
                      <h3 className="text-2xl font-cursive text-kryzalid-charcoal mb-4">
                        Configuration Calendly Requise
                      </h3>
                      <p className="text-kryzalid-grey mb-6 leading-relaxed font-serif">
                        Configurez votre lien Calendly dans <code className="bg-white px-2 py-1 rounded">/frontend/src/config/calendly.js</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fallback Button */}
              <div className="p-6 bg-gradient-to-r from-kryzalid-pink to-kryzalid-lavender text-center border-t">
                <p className="text-kryzalid-charcoal mb-3 font-serif text-sm">
                  Si le calendrier ne s'affiche pas:
                </p>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg"
                    className="bg-kryzalid-rose hover:bg-opacity-80 text-white px-6 py-4 rounded-full shadow-lg"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Ouvrir le Calendrier
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Alternative Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-kryzalid-rose to-kryzalid-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-cursive text-white mb-4 drop-shadow-lg">
            Besoin d'Aide ?
          </h2>
          <p className="text-lg mb-6 text-white/90 font-serif">
            Contactez-moi directement par téléphone ou WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+41784440101">
              <Button 
                size="lg"
                className="bg-white text-kryzalid-charcoal hover:bg-kryzalid-cream px-6 py-4 rounded-full shadow-xl font-medium"
              >
                +41 78 444 01 01
              </Button>
            </a>
            <a 
              href={`https://wa.me/41784440101?text=Bonjour, je souhaite réserver: ${encodeURIComponent(bookingDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-kryzalid-charcoal px-6 py-4 rounded-full font-medium"
              >
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
