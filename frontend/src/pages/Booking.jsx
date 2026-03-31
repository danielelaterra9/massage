import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Calendar, Clock, CheckCircle, Info, Sparkles } from 'lucide-react';
import { CALENDLY_CONFIG, isCalendlyConfigured, getCalendlyUrlForDuration } from '../config/calendly';

const Booking = () => {
  const location = useLocation();
  const selectedMassage = location.state?.selectedMassage || '';
  const supplementaryServices = location.state?.supplementaryServices || '';
  const totalDuration = location.state?.totalDuration || 0;
  const calendlyDuration = location.state?.calendlyDuration || totalDuration + 15;
  const totalPrice = location.state?.totalPrice || 0;
  
  // Get the specific Calendly URL based on total duration (including supplementary services)
  const calendlyUrl = getCalendlyUrlForDuration(calendlyDuration);
    
  const isConfigured = isCalendlyConfigured();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-kryzalid-cream to-white">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-kryzalid-pink to-kryzalid-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Calendar className="h-14 w-14 text-kryzalid-rose mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-cursive text-kryzalid-charcoal mb-4">
            Prendre Rendez-vous
          </h1>
          <div className="w-24 h-1 bg-kryzalid-rose mx-auto mb-6"></div>
          <p className="text-xl text-kryzalid-charcoal mb-2 leading-relaxed font-serif">
            Choisissez un créneau disponible. La confirmation est immédiate.
          </p>
        </div>
      </section>

      {/* Récapitulatif de la réservation */}
      {selectedMassage && (
        <section className="py-8 px-4 bg-white border-b border-kryzalid-cream">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-kryzalid-rose shadow-xl" data-testid="booking-recap">
              <CardContent className="p-6">
                <h3 className="text-2xl font-cursive text-kryzalid-charcoal mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-kryzalid-rose" />
                  Récapitulatif de votre réservation
                </h3>
                
                <div className="space-y-3">
                  {/* Massage principal */}
                  <div className="flex justify-between items-center">
                    <span className="text-kryzalid-charcoal font-medium">Massage sélectionné:</span>
                    <span className="text-kryzalid-charcoal font-semibold">{selectedMassage}</span>
                  </div>
                  
                  {/* Services supplémentaires */}
                  {supplementaryServices && (
                    <div className="flex justify-between items-start">
                      <span className="text-kryzalid-grey">Services supplémentaires:</span>
                      <span className="text-kryzalid-charcoal text-right max-w-xs">{supplementaryServices}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-kryzalid-cream pt-3 mt-3"></div>
                  
                  {/* Durée totale - MISE EN ÉVIDENCE */}
                  <div className="bg-gradient-to-r from-kryzalid-rose to-kryzalid-lavender rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-6 w-6 text-white" />
                      <span className="text-white font-medium text-lg">DURÉE TOTALE À RÉSERVER</span>
                    </div>
                    <span className="text-4xl font-bold text-white" data-testid="booking-duration">
                      {totalDuration} minutes
                    </span>
                    <p className="text-white/90 text-sm mt-2">
                      Veuillez sélectionner un créneau de cette durée dans le calendrier
                    </p>
                  </div>
                  
                  {/* Prix total */}
                  <div className="flex justify-between items-center bg-kryzalid-cream/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-kryzalid-rose" />
                      <span className="text-kryzalid-charcoal font-medium">Prix total à régler sur place:</span>
                    </div>
                    <span className="text-2xl font-bold text-kryzalid-rose" data-testid="booking-price">
                      CHF {totalPrice}.-
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Message d'instruction important */}
            <div className="mt-6 bg-amber-50 border-2 border-amber-300 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Info className="h-6 w-6 text-amber-600" />
                <span className="text-amber-800 font-bold text-lg">IMPORTANT</span>
              </div>
              <p className="text-amber-800 text-lg">
                Dans le calendrier ci-dessous, choisissez un créneau qui correspond à la durée de <strong>{totalDuration} minutes</strong> pour votre séance complète.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Calendly Widget Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-none overflow-hidden">
            <CardContent className="p-0">
              {/* Calendly Inline Widget */}
              <div className="calendly-container bg-white" style={{ minHeight: '700px' }}>
                {isConfigured ? (
                  <InlineWidget
                    url={calendlyUrl}
                    pageSettings={CALENDLY_CONFIG.PAGE_SETTINGS}
                    prefill={{
                      name: '',
                      email: '',
                      customAnswers: selectedMassage ? {
                        a1: `${selectedMassage}${supplementaryServices ? ' + ' + supplementaryServices : ''} (${totalDuration} min - CHF ${totalPrice}.-)`
                      } : {}
                    }}
                    styles={{
                      height: '700px',
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
                        Pour activer le système de réservation automatique, veuillez configurer votre lien Calendly dans le fichier <code className="bg-white px-2 py-1 rounded">/frontend/src/config/calendly.js</code>
                      </p>
                      <p className="text-sm text-kryzalid-grey">
                        Consultez le fichier de configuration pour les instructions détaillées.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fallback Button */}
              <div className="p-8 bg-gradient-to-r from-kryzalid-pink to-kryzalid-lavender text-center border-t">
                <p className="text-kryzalid-charcoal mb-4 font-serif">
                  Si le calendrier ne s'affiche pas correctement:
                </p>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg"
                    className="bg-kryzalid-rose hover:bg-opacity-80 text-white px-8 py-6 rounded-full shadow-lg"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Ouvrir le Calendrier dans une Nouvelle Page
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Alternative Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-kryzalid-rose to-kryzalid-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-cursive text-white mb-6 drop-shadow-lg">
            Besoin d'Aide pour Réserver ?
          </h2>
          <p className="text-xl mb-8 text-white/90 font-serif">
            N'hésitez pas à me contacter directement par téléphone ou WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+41784440101">
              <Button 
                size="lg"
                className="bg-white text-kryzalid-charcoal hover:bg-kryzalid-cream px-8 py-6 rounded-full shadow-xl font-medium"
              >
                Appeler: +41 78 444 01 01
              </Button>
            </a>
            <a 
              href="https://wa.me/41784440101?text=Bonjour,%20je%20souhaiterais%20prendre%20rendez-vous%20pour%20un%20massage."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-kryzalid-charcoal px-8 py-6 rounded-full font-medium"
              >
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-cursive text-center text-kryzalid-charcoal mb-8">
            Comment Réserver Votre Massage
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-kryzalid-rose text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium text-kryzalid-charcoal mb-2">Choisissez une Date et Heure</h4>
                <p className="text-kryzalid-grey font-serif">Sélectionnez le créneau qui vous convient dans le calendrier ci-dessus.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-kryzalid-rose text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium text-kryzalid-charcoal mb-2">Remplissez Vos Informations</h4>
                <p className="text-kryzalid-grey font-serif">Indiquez votre nom, email et numéro de téléphone.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-kryzalid-rose text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium text-kryzalid-charcoal mb-2">Confirmation Instantanée</h4>
                <p className="text-kryzalid-grey font-serif">Vous recevrez immédiatement une confirmation par email avec tous les détails.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
