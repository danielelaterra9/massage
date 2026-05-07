/**
 * CONFIGURATION CALENDLY
 * 
 * INSTRUCTIONS:
 * 1. Créez votre compte sur https://calendly.com/
 * 2. Configurez vos disponibilités (Europe/Zurich timezone)
 * 3. Créez un Event Type SÉPARÉ pour chaque durée de massage
 * 4. Copiez les liens Calendly pour chaque type de massage
 * 5. Remplacez les valeurs ci-dessous
 * 
 * IMPORTANT: Chaque massage avec une durée différente DOIT avoir son propre
 * Event Type dans Calendly pour que les créneaux disponibles s'adaptent
 * automatiquement à la durée du massage.
 * 
 * EXEMPLE DE STRUCTURE CALENDLY:
 * - Event Type "Massage 30 min" (Dos Détente, Tête Nuque Visage)
 * - Event Type "Massage 45 min" (Spécial Pieds)
 * - Event Type "Massage 60 min" (Dos Profond, Femme Enceinte, Anti-cellulite)
 * - Event Type "Massage 75 min" (Massage Relaxant, Massage à la Bougie)
 * - Event Type "Massage 90 min" (Massage Détente Profond, Pierres Chaudes, Lomi-Lomi, Gommage 60')
 * - Event Type "Massage 120 min" (Gommage Massage 90')
 */

export const CALENDLY_CONFIG = {
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
  
  // ⚠️ LIENS CALENDLY - Configurez vos Event Types pour chaque durée
  // Chaque slot est de 45 minutes
  // 1 slot = 45 min, 2 slots = 90 min, 3 slots = 135 min
  EVENT_TYPES: {
    'MASSAGE_45MIN': 'https://calendly.com/massages-kryzalid?hide_event_type_details=1',
    'MASSAGE_90MIN': 'https://calendly.com/massages-kryzalid?hide_event_type_details=1',
    'MASSAGE_135MIN': 'https://calendly.com/massages-kryzalid?hide_event_type_details=1',
    'MASSAGE_180MIN': 'https://calendly.com/massages-kryzalid?hide_event_type_details=1',
  },
  
  // Mapping des massages aux Event Types
  // Cela permet de rediriger chaque massage vers le bon lien Calendly
  MASSAGE_MAPPING: {
    'Massage Relaxant 75 min': 'MASSAGE_75MIN',
    'Massage Relaxant 90 min': 'MASSAGE_90MIN',
    'Massage Relaxant': 'MASSAGE_75MIN',
    'Massage Détente Profond': 'MASSAGE_90MIN',
    'Dos Détente': 'MASSAGE_30MIN',
    'Dos Profond': 'MASSAGE_60MIN',
    'Femme Enceinte': 'MASSAGE_60MIN',
    'Pierres Chaudes': 'MASSAGE_90MIN',
    'Gommage Massage 60\'': 'MASSAGE_90MIN',
    'Gommage Massage 90\'': 'MASSAGE_120MIN',
    'Massage à la Bougie': 'MASSAGE_75MIN',
    'Lomi-Lomi': 'MASSAGE_90MIN',
    'Spécial Pieds': 'MASSAGE_45MIN',
    'Anti-cellulite': 'MASSAGE_60MIN',
    'Tête Nuque Visage': 'MASSAGE_30MIN',
  }
};

// Fonction helper pour obtenir le lien Calendly d'un massage spécifique
export const getCalendlyUrlForMassage = (massageName) => {
  const eventType = CALENDLY_CONFIG.MASSAGE_MAPPING[massageName];
  if (eventType && CALENDLY_CONFIG.EVENT_TYPES[eventType]) {
    return CALENDLY_CONFIG.EVENT_TYPES[eventType];
  }
  // Fallback au premier event type si non trouvé
  return CALENDLY_CONFIG.EVENT_TYPES['MASSAGE_60MIN'];
};

// Fonction helper pour obtenir le lien Calendly basé sur la durée totale (en minutes)
// Arrondit au nombre de slots de 45 minutes nécessaires
export const getCalendlyUrlForDuration = (totalMinutes) => {
  // Chaque slot est de 45 minutes
  const slots = Math.ceil(totalMinutes / 45);
  const slotDuration = slots * 45;
  
  const eventTypeKey = `MASSAGE_${slotDuration}MIN`;
  return CALENDLY_CONFIG.EVENT_TYPES[eventTypeKey] || CALENDLY_CONFIG.EVENT_TYPES['MASSAGE_45MIN'];
};

// Fonction helper pour vérifier si le lien Calendly est configuré
export const isCalendlyConfigured = () => {
  const firstEventType = CALENDLY_CONFIG.EVENT_TYPES['MASSAGE_45MIN'];
  return firstEventType && !firstEventType.includes('[VOTRE_NOM]');
};
