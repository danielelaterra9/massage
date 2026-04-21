/**
 * CONFIGURATION CALENDLY
 */

export const CALENDLY_CONFIG = {
  PAGE_SETTINGS: {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '047857',
    textColor: '1f2937'
  },
  
  TIMEZONE: 'Europe/Zurich',
  
  // Link aggiornati per rimuovere intervalli da 30 min e allineare alla durata reale
  EVENT_TYPES: {
    'MASSAGE_30MIN': 'https://calendly.com/caroline-maret/massage-30min',
    'MASSAGE_45MIN': 'https://calendly.com/caroline-maret/massage-45min',
    'MASSAGE_60MIN': 'https://calendly.com/caroline-maret/massage-60min',
    'MASSAGE_75MIN': 'https://calendly.com/caroline-maret/massage-75min',
    'MASSAGE_90MIN': 'https://calendly.com/caroline-maret/massage-90min',
    'MASSAGE_120MIN': 'https://calendly.com/caroline-maret/massage-120min',
  },
  
  MASSAGE_MAPPING: {
    'Massage Relaxant': 'MASSAGE_75MIN',
    'Massage Détente Profond': 'MASSAGE_90MIN',
    'Dos Détente': 'MASSAGE_30MIN',
    'Dos Profond 45': 'MASSAGE_45MIN',
    'Dos Profond 60': 'MASSAGE_60MIN',
    'Femme Enceinte': 'MASSAGE_75MIN',
    'Pierres Chaudes': 'MASSAGE_75MIN',
    'Gommage Massage 120\'': 'MASSAGE_120MIN',
    'Gommage Massage 150\'': 'MASSAGE_120MIN', // Fallback to max available
    'Massage à la Bougie': 'MASSAGE_75MIN',
    'Lomi-Lomi': 'MASSAGE_75MIN',
    'Spécial Pieds': 'MASSAGE_60MIN',
    'Anti-cellulite': 'MASSAGE_45MIN',
    'Tête Nuque Visage': 'MASSAGE_30MIN',
  }
};

export const getCalendlyUrlForMassage = (massageName) => {
  const eventType = CALENDLY_CONFIG.MASSAGE_MAPPING[massageName];
  if (eventType && CALENDLY_CONFIG.EVENT_TYPES[eventType]) {
    return CALENDLY_CONFIG.EVENT_TYPES[eventType];
  }
  return CALENDLY_CONFIG.EVENT_TYPES['MASSAGE_60MIN'];
};

export const isCalendlyConfigured = () => {
  const firstEventType = CALENDLY_CONFIG.EVENT_TYPES['MASSAGE_30MIN'];
  return firstEventType && !firstEventType.includes('[VOTRE_NOM]');
};
