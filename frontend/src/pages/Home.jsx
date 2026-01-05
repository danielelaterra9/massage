import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calendar, Heart, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1696841212541-449ca29397cc?w=1920&q=80"
            alt="Massage bien-être"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
            Votre Bien-Être,
            <span className="block mt-2 font-normal">Notre Passion</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Chaque massage est une expérience unique, adaptée à vos besoins physiques et émotionnels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/massages">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Prendre Rendez-vous
              </Button>
            </Link>
            <Link to="/massages">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full">
                Découvrir nos Soins
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Bienvenue à l'Institut Kryzalid
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Je m'appelle <strong>Caroline Maret</strong>, et je possède plus de 15 ans d'expérience dans la massothérapie.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Mon approche intuitive me permet de déceler les maux, physiques et émotionnels, 
            et de travailler sur l'ensemble du corps pour les libérer.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Je suis installée dans <strong>La Maison 44</strong> à Evionnaz. Cette jolie maison rénovée abrite 
            plusieurs thérapeutes, dans une ambiance bienveillante et chaleureuse.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-16">
            Les Bienfaits du Massage
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <Heart className="h-10 w-10 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Détente Profonde</h3>
              <p className="text-gray-600 leading-relaxed">
                Libérez les tensions accumulées et retrouvez un état de relaxation complet pour le corps et l'esprit.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                <Sparkles className="h-10 w-10 text-amber-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Écoute Personnalisée</h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque séance est adaptée à vos besoins uniques, en fonction de ce que votre corps exprime.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Calendar className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Rendez-vous Flexible</h3>
              <p className="text-gray-600 leading-relaxed">
                Ouvert du lundi matin au samedi midi, sur rendez-vous, pour s'adapter à votre emploi du temps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Prêt à Prendre Soin de Vous ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Offrez-vous un moment de détente et de bien-être. Choisissez votre massage.
          </p>
          <Link to="/massages">
            <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-6 text-lg rounded-full shadow-lg">
              Voir les Massages
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;