import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Reservation = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    massage: '',
    message: ''
  });
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reservationData = {
        ...formData,
        date: date.toISOString(),
        timeSlot,
        status: 'pending'
      };

      await axios.post(`${API}/reservations`, reservationData);
      
      toast.success('Demande de réservation envoyée!', {
        description: 'Nous vous contacterons rapidement pour confirmer votre rendez-vous.'
      });

      // Reset form
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        massage: '',
        message: ''
      });
      setDate(new Date());
      setTimeSlot('');
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer ou nous contacter directement.'
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = '41784440101';
  const whatsappMessage = encodeURIComponent('Bonjour, je souhaiterais prendre rendez-vous pour un massage.');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6">
            Réservation & Contact
          </h1>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Prenez rendez-vous facilement et offrez-vous un moment de détente bien mérité.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-500 h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">WhatsApp</h3>
                  <p className="text-gray-600">Réponse rapide et directe</p>
                </CardContent>
              </Card>
            </a>

            <a href="tel:+41784440101" className="block">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-500 h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Téléphone</h3>
                  <p className="text-gray-600">+41 78 444 01 01</p>
                </CardContent>
              </Card>
            </a>

            <Card className="bg-emerald-50 border-2 border-emerald-200 h-full">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Formulaire</h3>
                <p className="text-gray-600">Réservez en ligne ci-dessous</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl border-none">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-stone-50">
              <CardTitle className="text-3xl font-light text-gray-800">
                Formulaire de Réservation
              </CardTitle>
              <CardDescription className="text-lg">
                Remplissez le formulaire ci-dessous et nous vous contacterons pour confirmer votre rendez-vous.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="nom" className="text-base">Nom Complet *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-12"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-12"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telephone" className="text-base">Téléphone *</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-12"
                        placeholder="+41 XX XXX XX XX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="massage" className="text-base">Type de Massage *</Label>
                      <Select name="massage" value={formData.massage} onValueChange={(value) => setFormData(prev => ({ ...prev, massage: value }))} required>
                        <SelectTrigger className="mt-2 h-12">
                          <SelectValue placeholder="Choisissez un massage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relaxant">Massage Relaxant (75 min)</SelectItem>
                          <SelectItem value="detente-profond">Massage Détente Profond (90 min)</SelectItem>
                          <SelectItem value="dos-detente">Dos Détente (30 min)</SelectItem>
                          <SelectItem value="dos-profond">Dos Profond (60 min)</SelectItem>
                          <SelectItem value="femme-enceinte">Femme Enceinte (60 min)</SelectItem>
                          <SelectItem value="pierres-chaudes">Pierres Chaudes (90 min)</SelectItem>
                          <SelectItem value="gommage-60">Gommage Massage 60' (90 min)</SelectItem>
                          <SelectItem value="gommage-90">Gommage Massage 90' (120 min)</SelectItem>
                          <SelectItem value="bougie">Massage à la Bougie (75 min)</SelectItem>
                          <SelectItem value="lomi-lomi">Lomi-Lomi (90 min)</SelectItem>
                          <SelectItem value="pieds">Spécial Pieds (45 min)</SelectItem>
                          <SelectItem value="anti-cellulite">Anti-cellulite (60 min)</SelectItem>
                          <SelectItem value="tete-nuque">Tête Nuque Visage (30 min)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-2 min-h-[100px]"
                        placeholder="Informations complémentaires..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Calendar */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base mb-3 block">
                        <CalendarIcon className="inline-block h-5 w-5 mr-2" />
                        Date Souhaitée *
                      </Label>
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border shadow mx-auto"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base">
                        <Clock className="inline-block h-5 w-5 mr-2" />
                        Heure Souhaitée *
                      </Label>
                      <Select value={timeSlot} onValueChange={setTimeSlot} required>
                        <SelectTrigger className="mt-2 h-12">
                          <SelectValue placeholder="Choisissez une heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-12 py-6 text-lg rounded-full"
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer la Demande'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-12">Informations de Contact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Adresse</h3>
                <p className="opacity-90 leading-relaxed">
                  Institut Kryzalid<br />
                  La Maison 44<br />
                  Rue Principale 44<br />
                  1902 Evionnaz, Valais
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Horaires</h3>
                <p className="opacity-90 leading-relaxed">
                  Lundi - Samedi<br />
                  Matin et après-midi<br />
                  Sur rendez-vous uniquement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;