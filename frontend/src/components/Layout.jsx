import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="text-2xl md:text-3xl font-light text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">
                Institut <span className="font-normal">Kryzalid</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/about"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/about') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                À Propos
              </Link>
              <Link
                to="/massages"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/massages') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                Massages & Tarifs
              </Link>
              <Link
                to="/reservation"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Réserver
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Institut Kryzalid</h3>
              <p className="text-gray-400 leading-relaxed">
                Plus de 15 ans d'expérience en massothérapie. 
                Chaque massage est adapté à vos besoins uniques.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+41784440101" className="hover:text-emerald-400 transition-colors">
                    +41 78 444 01 01
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Rue Principale 44, 1902 Evionnaz</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Navigation</h4>
              <nav className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  À Propos
                </Link>
                <Link to="/massages" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Massages & Tarifs
                </Link>
                <Link to="/reservation" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Réservation
                </Link>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Institut Kryzalid. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;