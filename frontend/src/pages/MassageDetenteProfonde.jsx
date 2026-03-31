import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Calendar, CheckCircle, MessageCircle, Phone, Clock, Heart } from 'lucide-react';

const MassageDetenteProfonde = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80"
            alt="Massage Détente Profonde"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            🌿
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
            Massage Détente Profonde
          </h1>
          <p className="text-2xl md:text-3xl font-light leading-relaxed">
            Un moment pour relâcher le corps et apaiser l'esprit
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Dans le rythme souvent soutenu de la vie quotidienne, le corps accumule des tensions que l'on ne perçoit pas toujours immédiatement : nuque raide, épaules contractées, fatigue persistante, sommeil perturbé.
          </p>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Le massage détente profonde est un soin enveloppant et progressif, conçu pour libérer les tensions installées et permettre au système nerveux de retrouver un état de calme naturel.
          </p>
          
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-lg my-8">
            <p className="text-lg text-gray-800 font-medium">
              Ce n'est pas seulement un moment agréable.
            </p>
            <p className="text-lg text-gray-800 font-medium">
              C'est un véritable travail sur la détente musculaire et l'équilibre global.
            </p>
          </div>
        </div>
      </section>

      {/* Image Section 1 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?w=1200&q=80"
            alt="Massage professionnel"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* À qui s'adresse ce massage */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            À qui s'adresse ce massage ?
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Ce soin est particulièrement adapté si vous :
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">ressentez des tensions dans le dos, les épaules ou la nuque</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">avez du stress accumulé ou une charge mentale importante</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">dormez difficilement</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">vous sentez fatigué(e) sans raison apparente</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">avez besoin d'un moment pour vous recentrer</p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed italic text-center">
            Il convient aussi très bien en prévention, pour maintenir un bon équilibre corporel et émotionnel.
          </p>
        </div>
      </section>

      {/* Image Section 2 */}
      <section className="py-12 px-4 bg-gradient-to-br from-emerald-50 to-stone-50">
        <div className="max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1544843776-7c98a52e08a4?w=1200&q=80"
            alt="Environnement serein"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Les bienfaits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            Les bienfaits du massage détente profonde
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
            Chaque séance peut apporter :
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Relâchement des tensions musculaires</p>
            </div>
            
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Diminution du stress et de l'anxiété</p>
            </div>
            
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Amélioration de la qualité du sommeil</p>
            </div>
            
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Sensation de légèreté et de clarté mentale</p>
            </div>
            
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Meilleure circulation sanguine et lymphatique</p>
            </div>
            
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <p className="text-lg text-gray-800">Reconnexion au corps et aux sensations</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed text-center italic">
            Le toucher lent et profond permet au corps de relâcher progressivement les zones contractées sans brutalité.
          </p>
        </div>
      </section>

      {/* Comment se déroule une séance */}
      <section className="py-20 px-4 bg-gradient-to-br from-stone-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            Comment se déroule une séance ?
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              La séance commence toujours par un court échange afin de comprendre vos besoins du moment.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              La pression et le rythme sont adaptés en fonction de votre sensibilité et de vos tensions.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Le massage se déroule dans un cadre calme et respectueux, favorisant un lâcher-prise progressif.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Durée</h3>
                <p className="text-gray-600">60 ou 90 minutes</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Huile</h3>
                <p className="text-gray-600">Huile naturelle adaptée à votre peau</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section 3 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1724703041603-f1da8fd0b91a?w=1200&q=80"
            alt="Relaxation profonde"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Pourquoi choisir ce soin */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            Pourquoi choisir ce soin ?
          </h2>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              Parce que prendre soin de soi n'est pas un luxe.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              C'est un moyen simple et efficace de préserver son énergie, sa santé et son équilibre intérieur.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Beaucoup de personnes attendent d'être épuisées pour s'accorder une pause.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed italic">
              Ce massage est une invitation à écouter son corps avant qu'il ne réclame plus fortement de l'attention.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            Ce que disent mes clientes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="text-5xl text-emerald-600 mb-4">"</div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                  Je ne pensais pas être aussi tendue. Après la séance, j'ai senti un relâchement immédiat et j'ai dormi profondément cette nuit-là.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="text-5xl text-emerald-600 mb-4">"</div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                  Un vrai moment pour moi. Je suis ressortie plus légère, plus calme, comme si mon corps avait enfin respiré.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Réservation */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Prendre rendez-vous
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Si vous ressentez le besoin de relâcher les tensions et de retrouver un état de calme profond, vous pouvez choisir directement un créneau disponible.
          </p>
          <Link to="/reservation" state={{ selectedMassage: 'Massage Détente Profond' }}>
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-gray-100 px-10 py-6 text-lg rounded-full shadow-xl mb-8">
              <Calendar className="mr-2 h-5 w-5" />
              Réserver votre séance
            </Button>
          </Link>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-2xl font-light mb-4">
              Une question avant de réserver ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Si vous hésitez ou souhaitez vérifier que ce soin correspond à votre situation, vous pouvez me contacter directement.
            </p>
            <p className="text-lg mb-6 opacity-90">
              Je vous répondrai avec plaisir.
            </p>
            <p className="text-lg italic opacity-90 mb-8">
              Prendre le temps d'échanger est parfois le premier pas vers un mieux-être.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+41784440101">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-6 rounded-full">
                  <Phone className="mr-2 h-5 w-5" />
                  +41 78 444 01 01
                </Button>
              </a>
              
              <a 
                href="https://wa.me/41784440101?text=Bonjour,%20j'ai%20une%20question%20sur%20le%20massage%20détente%20profonde."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-6 rounded-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MassageDetenteProfonde;
