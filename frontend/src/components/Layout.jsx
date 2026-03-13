import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
              <img 
                src="https://customer-assets.emergentagent.com/job_kryzalid-massage/artifacts/nchtw66d_logo%20caro.jpg" 
                alt="Kryzalid Logo" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/') ? 'text-kryzalid-rose' : 'text-kryzalid-charcoal hover:text-kryzalid-rose'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/about"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/about') ? 'text-kryzalid-rose' : 'text-kryzalid-charcoal hover:text-kryzalid-rose'
                }`}
              >
                À Propos
              </Link>
              <Link
                to="/massages"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/massages') ? 'text-kryzalid-rose' : 'text-kryzalid-charcoal hover:text-kryzalid-rose'
                }`}
              >
                Massages & Tarifs
              </Link>
              <Link
                to="/massage-detente-profonde"
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive('/massage-detente-profonde') ? 'text-kryzalid-rose' : 'text-kryzalid-charcoal hover:text-kryzalid-rose'
                }`}
              >
                Détente Profonde
              </Link>
              <Link
                to="/reservation"
                className="bg-kryzalid-rose hover:bg-opacity-80 text-kryzalid-charcoal px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Réserver
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t mt-2 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive('/') 
                      ? 'bg-kryzalid-pink text-kryzalid-rose' 
                      : 'text-kryzalid-charcoal hover:bg-kryzalid-cream'
                  }`}
                >
                  Accueil
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive('/about') 
                      ? 'bg-kryzalid-pink text-kryzalid-rose' 
                      : 'text-kryzalid-charcoal hover:bg-kryzalid-cream'
                  }`}
                >
                  À Propos
                </Link>
                <Link
                  to="/massages"
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive('/massages') 
                      ? 'bg-kryzalid-pink text-kryzalid-rose' 
                      : 'text-kryzalid-charcoal hover:bg-kryzalid-cream'
                  }`}
                >
                  Massages & Tarifs
                </Link>
                <Link
                  to="/massage-detente-profonde"
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive('/massage-detente-profonde') 
                      ? 'bg-kryzalid-pink text-kryzalid-rose' 
                      : 'text-kryzalid-charcoal hover:bg-kryzalid-cream'
                  }`}
                >
                  Détente Profonde
                </Link>
                <Link
                  to="/reservation"
                  onClick={closeMobileMenu}
                  className="bg-kryzalid-rose hover:bg-opacity-80 text-kryzalid-charcoal px-6 py-3 rounded-full transition-all duration-300 shadow-md text-center font-medium"
                >
                  Réserver
                </Link>
              </div>
            </nav>
          )}
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
                <Link to="/massage-detente-profonde" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                  Détente Profonde
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