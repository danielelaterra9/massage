/**
 * CONFIGURATION CALENDLY
 * 
 * INSTRUCTIONS:
 * 1. Créez votre compte sur https://calendly.com/
 * 2. Configurez vos disponibilités (Europe/Zurich timezone)
 * 3. Créez un type d'événement pour "Massage"
 * 4. Copiez votre lien Calendly personnel
 * 5. Remplacez la valeur CALENDLY_URL ci-dessous
 * 
 * EXEMPLE DE LIEN:
 * 'https://calendly.com/votre-nom/massage-60min'
 */

export const CALENDLY_CONFIG = {
  // ⚠️ REMPLACEZ CE LIEN PAR VOTRE LIEN CALENDLY PERSONNEL
  CALENDLY_URL: 'https://calendly.com/[INSERIRE_LINK_CALENDLY]',
  
  // Configuration de l'apparence (couleurs personnalisées)
  PAGE_SETTINGS: {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '047857', // Vert émeraude (emerald-700)
    textColor: '1f2937' // Gris foncé (gray-800)
  },
  
  // Configuration du fuseau horaire
  TIMEZONE: 'Europe/Zurich',
  
  // Durées recommandées pour les massages
  DURATIONS: {
    SHORT: 30, // Dos Détente, Tête Nuque Visage
    MEDIUM: 60, // Dos Profond, Femme Enceinte, Anti-cellulite
    LONG: 75, // Massage Relaxant, Massage à la Bougie
    EXTENDED: 90, // Massage Détente Profond, Pierres Chaudes, Lomi-Lomi
    EXTRA_LONG: 120 // Gommage Massage 90'
  }
};

// Fonction helper pour vérifier si le lien Calendly est configuré
export const isCalendlyConfigured = () => {
  return !CALENDLY_CONFIG.CALENDLY_URL.includes('[INSERIRE_LINK_CALENDLY]');
};
