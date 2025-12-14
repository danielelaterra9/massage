import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
              À Propos
            </h1>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80"
                alt="Massage therapy"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
                Caroline Maret
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Massothérapeute passionnée avec plus de <strong>15 ans d'expérience</strong>, 
                je vous accueille à l'Institut Kryzalid pour vous offrir des moments de détente 
                et de bien-être profond.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Mon approche est basée sur l'<strong>écoute profonde</strong> de chaque personne. 
                Je crois fermement que chaque client est unique et mérite une attention particulière.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Grâce à mon intuition développée au fil des années, je suis capable de déceler 
                les tensions physiques et émotionnelles, et d'adapter chaque massage en conséquence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Ma Philosophie
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-12"></div>
          <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
            « Chaque personne est unique, et chaque massage est adapté en fonction 
            de ce que le corps et l'esprit communiquent. »
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Je ne propose pas simplement un massage standardisé. Mon travail consiste à 
            <strong> vous écouter</strong>, à <strong>comprendre vos besoins</strong> et à 
            <strong> personnaliser chaque séance</strong> pour qu'elle corresponde exactement 
            à ce dont vous avez besoin à ce moment précis.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-16">
            Mes Valeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Écoute & Empathie</h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque séance commence par une écoute attentive de vos besoins, 
                de vos tensions et de vos attentes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-amber-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Professionnalisme</h3>
              <p className="text-gray-600 leading-relaxed">
                15 ans d'expérience et une formation continue pour vous offrir 
                les meilleurs soins de massothérapie.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Approche Holistique</h3>
              <p className="text-gray-600 leading-relaxed">
                Je travaille sur l'ensemble du corps pour libérer les tensions 
                physiques et émotionnelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12">
            La Maison 44
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'Institut Kryzalid est installé dans <strong>La Maison 44</strong> à Evionnaz, 
              une belle maison récemment rénovée qui abrite plusieurs thérapeutes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'ambiance y est <strong>bienveillante et chaleureuse</strong>. Nous avons tous 
              à cœur de rendre la vie de nos clients plus douce et de créer un espace où 
              le bien-être est au centre de nos préoccupations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              C'est avec plaisir que je vous accueille <strong>du lundi matin au samedi midi</strong>, 
              sur rendez-vous uniquement.
            </p>
            <div className="mt-8 text-center">
              <Link to="/reservation">
                <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-6 text-lg rounded-full">
                  Me Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;