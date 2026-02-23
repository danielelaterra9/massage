import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Clock, Sparkles, Calendar } from 'lucide-react';

const massagesData = [
  {
    id: 1,
    name: 'Massage Relaxant',
    duration: '75 minutes',
    price: 'CHF 140',
    description: 'Massage du corps en entier. N\'hésitez pas à me faire part des zones du corps que vous souhaitez privilégier ou au contraire éviter.',
    category: 'Détente'
  },
  {
    id: 2,
    name: 'Massage Détente Profond',
    duration: '90 minutes',
    price: 'CHF 165',
    description: 'Massage du corps entier. Pour une complète remise à neuf! N\'hésitez pas à me faire part des zones du corps que vous souhaitez privilégier ou au contraire éviter.',
    category: 'Détente',
    hasDetailPage: true,
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/oo31kawa_detente%20profond.png'
  },
  {
    id: 3,
    name: 'Dos Détente',
    duration: '30 minutes',
    price: 'CHF 65',
    description: 'Massage uniquement relaxant du dos, idéal pour une pause bien-être rapide.',
    category: 'Dos'
  },
  {
    id: 4,
    name: 'Dos Profond',
    duration: '60 minutes',
    price: 'CHF 120',
    description: 'Traite les tensions et blocages du dos avec efficacité. Un soin thérapeutique complet.',
    category: 'Dos',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/i8u00nkd_dos%20profond.png'
  },
  {
    id: 5,
    name: 'Femme Enceinte',
    duration: '60 minutes',
    price: 'CHF 120',
    description: 'La grossesse est une période parfois stressante. Ce massage est une bouffée d\'oxygène, un moment cocooning extrêmement apprécié! Pratiqué avec une huile neutre.',
    category: 'Spécialisé',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/g4rqx80r_femme%20encinte.png'
  },
  {
    id: 6,
    name: 'Pierres Chaudes',
    duration: '90 minutes',
    price: 'CHF 175',
    description: 'Le massage détente par excellence! Les pierres volcaniques sont chauffées à 55-60°C et diffusent lentement leur chaleur. Il est conseillé de prévoir quelques heures de repos après.',
    category: 'Premium',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/rlns3bd0_pierres%20chaudes.png'
  },
  {
    id: 7,
    name: 'Gommage Massage 60\'',
    duration: '90 minutes',
    price: 'CHF 180',
    description: 'Gommage de tout le corps à base de sel de l\'Himalaya et de miel. Suivi d\'une douche et d\'un massage de 60\'. Une peau toute douce, un corps totalement détendu!',
    category: 'Premium',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/87szydj6_gommage%20massage.png'
  },
  {
    id: 8,
    name: 'Gommage Massage 90\'',
    duration: '120 minutes',
    price: 'CHF 215',
    description: 'Gommage complet suivi d\'un massage de 90 minutes. Le rêve absolu pour une transformation complète!',
    category: 'Premium',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/87szydj6_gommage%20massage.png'
  },
  {
    id: 9,
    name: 'Massage à la Bougie',
    duration: '75 minutes',
    price: 'CHF 150',
    description: 'Avec les bougies 100% naturelles de la marque Orli. Beurre de cacao, karité et huiles de jojoba, d\'amandes douces et d\'argan. Fragrances à choix.',
    category: 'Premium'
  },
  {
    id: 10,
    name: 'Lomi-Lomi',
    duration: '90 minutes',
    price: 'CHF 165',
    description: 'Massage hawaïen avec des mouvements amples et saccadés, enveloppant et énergisant. Permet un lâcher-prise sur les soucis du quotidien. Huile de Monoï ou de coco chaudes.',
    category: 'Spécialisé',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/pz2ya9rw_lomi%20lomi.png'
  },
  {
    id: 11,
    name: 'Spécial Pieds',
    duration: '45 minutes',
    price: 'CHF 85',
    description: 'Entre massage thaï, décontractant et réflexologie. C\'est le pied!',
    category: 'Spécialisé',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/r4r4dlxj_special%20pieds.png'
  },
  {
    id: 12,
    name: 'Anti-cellulite',
    duration: '60 minutes',
    price: 'CHF 120',
    description: 'Une peau plus ferme et débarrassée de l\'effet peau d\'orange. Un minimum de 10 séances est requis, conseillé 2 séances par semaine. Doit être supporté par une alimentation saine.',
    category: 'Spécialisé',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/9axd12xb_Soins%20anti-cellulite%20en%20spa%20chaleureux.png'
  },
  {
    id: 13,
    name: 'Tête Nuque Visage',
    duration: '30 minutes',
    price: 'CHF 65',
    description: 'Massage du crâne, de la nuque et du visage. Parfait pour oublier tous ses soucis! Ce soin peut être combiné avec le massage du dos.',
    category: 'Détente',
    image: 'https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/r409sg6g_tete.png'
  }
];

const Massages = () => {
  const categories = ['Tous', 'Détente', 'Dos', 'Spécialisé', 'Premium'];
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');
  const navigate = useNavigate();

  const filteredMassages = selectedCategory === 'Tous' 
    ? massagesData 
    : massagesData.filter(m => m.category === selectedCategory);

  const handleBooking = (massageName) => {
    // Navigate to booking page with pre-selected massage name
    navigate('/reservation', { state: { selectedMassage: massageName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Massages & Tarifs
          </h1>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Découvrez notre gamme complète de soins personnalisés, 
            conçus pour répondre à vos besoins uniques de bien-être.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
                    : 'border-emerald-700 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Massages Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMassages.map((massage) => (
              <Card key={massage.id} className="hover:shadow-2xl transition-all duration-300 border-none shadow-lg overflow-hidden group">
                {/* Image */}
                {massage.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={massage.image} 
                      alt={massage.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                      {massage.category}
                    </span>
                  </div>
                )}
                
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-700 group-hover:from-emerald-600 group-hover:to-emerald-800 transition-all duration-300"></div>
                <CardHeader className="pb-4">
                  <div className={massage.image ? '' : 'flex justify-between items-start mb-2'}>
                    <CardTitle className="text-2xl font-medium text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">
                      {massage.name}
                    </CardTitle>
                    {!massage.image && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {massage.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{massage.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-semibold text-emerald-700">{massage.price}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {massage.description}
                  </CardDescription>
                  {massage.hasDetailPage && (
                    <Link 
                      to="/massage-detente-profonde"
                      className="inline-block mt-4 text-emerald-700 hover:text-emerald-800 font-medium underline"
                    >
                      En savoir plus sur ce massage →
                    </Link>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleBooking(massage.name)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Réserver Maintenant
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Prêt à Réserver Votre Séance ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenez rendez-vous dès maintenant et offrez-vous un moment de pur bien-être.
          </p>
          <Link to="/reservation">
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-gray-100 px-10 py-6 text-lg rounded-full shadow-xl">
              Réserver Maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Massages;