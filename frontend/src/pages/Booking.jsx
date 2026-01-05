import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Calendar, Clock, CheckCircle } from 'lucide-react';
import { CALENDLY_CONFIG, isCalendlyConfigured } from '../config/calendly';

const Booking = () => {
  const location = useLocation();
  const selectedMassage = location.state?.selectedMassage || '';
  
  const calendlyUrl = CALENDLY_CONFIG.CALENDLY_URL;
  const isConfigured = isCalendlyConfigured();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Calendar className="h-16 w-16 text-emerald-700 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Prendre Rendez-vous
          </h1>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 mb-2 leading-relaxed">
            Choisissez un créneau disponible. La confirmation est immédiate.
          </p>
          <p className="text-lg text-gray-600">
            Vous ne verrez que les horaires pendant lesquels je suis disponible.
          </p>
          
          {selectedMassage && (
            <div className="mt-6 inline-block bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full">
              <span className="font-medium">Massage sélectionné: </span>
              <span className="font-semibold">{selectedMassage}</span>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Confirmation Immédiate</h3>
              <p className="text-gray-600">Votre rendez-vous est confirmé instantanément</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Horaires Disponibles</h3>
              <p className="text-gray-600">Seuls les créneaux libres sont affichés</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Simple et Rapide</h3>
              <p className="text-gray-600">Réservez en quelques clics seulement</p>
            </div>
          </div>
        </div>
      </section>

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
                        a1: selectedMassage
                      } : {}
                    }}
                    styles={{
                      height: '700px',
                      width: '100%'
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full p-12 bg-amber-50">
                    <div className="text-center max-w-xl">
                      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-10 w-10 text-amber-700" />
                      </div>
                      <h3 className="text-2xl font-medium text-gray-800 mb-4">
                        Configuration Calendly Requise
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Pour activer le système de réservation automatique, veuillez configurer votre lien Calendly dans le fichier <code className="bg-gray-100 px-2 py-1 rounded">/frontend/src/config/calendly.js</code>
                      </p>
                      <p className="text-sm text-gray-500">
                        Consultez le fichier de configuration pour les instructions détaillées.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fallback Button */}
              <div className="p-8 bg-gradient-to-r from-emerald-50 to-stone-50 text-center border-t">
                <p className="text-gray-700 mb-4">
                  Si le calendrier ne s'affiche pas correctement:
                </p>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 rounded-full shadow-lg"
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
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Besoin d'Aide pour Réserver ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            N'hésitez pas à me contacter directement par téléphone ou WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+41784440101">
              <Button 
                size="lg"
                className="bg-white text-emerald-800 hover:bg-gray-100 px-8 py-6 rounded-full shadow-xl"
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
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-6 rounded-full"
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
          <h3 className="text-2xl font-light text-center text-gray-800 mb-8">
            Comment Réserver Votre Massage
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Choisissez une Date et Heure</h4>
                <p className="text-gray-600">Sélectionnez le créneau qui vous convient dans le calendrier ci-dessus.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Remplissez Vos Informations</h4>
                <p className="text-gray-600">Indiquez votre nom, email et numéro de téléphone.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Confirmation Instantanée</h4>
                <p className="text-gray-600">Vous recevrez immédiatement une confirmation par email avec tous les détails.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
