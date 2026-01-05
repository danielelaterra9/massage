# Institut Kryzalid - Sistema di Prenotazione Automatico con Calendly

## 📋 Panoramica

Il sito è stato aggiornato con un sistema di prenotazione completamente automatico integrato con Calendly. Gli utenti possono:
- Vedere solo gli orari disponibili
- Prenotare direttamente senza conferma manuale
- Ricevere conferma immediata via email

## 🚀 Come Configurare Calendly

### 1. Creare Account Calendly

1. Vai su [https://calendly.com/signup](https://calendly.com/signup)
2. Crea il tuo account gratuito o a pagamento
3. Configura il tuo profilo

### 2. Configurare le Disponibilità

1. Nel dashboard Calendly, vai su **Settings** → **Availability**
2. Imposta il fuso orario: **Europe/Zurich**
3. Definisci i tuoi orari di lavoro:
   - Lundi - Samedi
   - Orari mattina e pomeriggio
4. Imposta pause tra appuntamenti (consigliato: 10-15 minuti)
5. Configura preavviso minimo per le prenotazioni (opzionale)

### 3. Creare Tipi di Eventi

Crea diversi tipi di eventi per i massaggi:

#### Esempio: Massage Relaxant (75 min)
- **Nome evento**: Massage Relaxant
- **Durata**: 75 minuti
- **Descrizione**: Massage du corps en entier pour une détente complète
- **Prezzo**: CHF 140 (opzionale nel nome)
- **Buffer**: 15 minuti

Ripeti per tutti i tipi di massaggio offerti.

### 4. Configurare i Campi del Modulo

In **Event Settings** → **Questions**, aggiungi:
- ✅ Nome (obbligatorio)
- ✅ Email (obbligatorio)
- ✅ Telefono (opzionale)
- ✅ Note/Messaggio (opzionale)

### 5. Personalizzare Conferme e Promemoria

1. Vai su **Workflows** → **Notifications**
2. Personalizza l'email di conferma in francese
3. Configura promemoria automatici:
   - 24 ore prima
   - 1 ora prima (SMS se hai piano premium)

### 6. Inserire il Link nel Sito

1. Copia il tuo link Calendly principale (es: `https://calendly.com/tuonome`)
2. Apri il file: `/app/frontend/src/config/calendly.js`
3. Sostituisci il placeholder con il tuo link:

```javascript
export const CALENDLY_CONFIG = {
  CALENDLY_URL: 'https://calendly.com/tuonome/massage',  // ← Inserisci qui
  // ... resto della configurazione
};
```

4. Salva il file
5. Il sistema caricherà automaticamente il widget Calendly

## 📱 Funzionalità Implementate

### Pagine Principali

1. **Home** (`/`)
   - Hero section con CTA "Prendre Rendez-vous"
   - Introduzione a Caroline e Institut Kryzalid
   - Benefici dei massaggi

2. **À Propos** (`/about`)
   - Storia e filosofia di Caroline
   - Valori e approccio personalizzato
   - Informazioni su La Maison 44

3. **Massages & Tarifs** (`/massages`)
   - 13 tipologie di massaggi con prezzi
   - Filtri per categoria (Détente, Dos, Spécialisé, Premium)
   - **Pulsante "Réserver Maintenant"** sotto ogni servizio
   - Navigazione diretta alla prenotazione con massaggio pre-selezionato

4. **Réservation** (`/reservation`)
   - Widget Calendly integrato inline
   - Sistema di prenotazione automatico
   - Conferma immediata
   - Pulsante fallback se il widget non si carica
   - Contatti alternativi (Telefono, WhatsApp)
   - Istruzioni passo-passo

### Sistema di Prenotazione

#### Caratteristiche:
- ✅ Calendario inline integrato con Calendly
- ✅ Solo orari disponibili mostrati
- ✅ Conferma immediata senza approvazione manuale
- ✅ Email di conferma automatica
- ✅ Fuso orario Europe/Zurich
- ✅ Responsive (mobile e desktop)
- ✅ Massaggio pre-selezionato quando si clicca da pagina servizi
- ✅ Pulsante fallback per problemi di caricamento
- ✅ Contatti alternativi (telefono +41 78 444 01 01, WhatsApp)

#### Flusso Utente:
1. L'utente naviga nella pagina Massages
2. Clicca "Réserver Maintenant" sotto il massaggio desiderato
3. Viene reindirizzato alla pagina Réservation con il massaggio pre-selezionato
4. Sceglie data e ora disponibili nel calendario Calendly
5. Compila i dati (nome, email, telefono)
6. Riceve conferma immediata

## 🎨 Design e UX

### Palette Colori
- **Primario**: Verde smeraldo (`#047857` - emerald-700)
- **Secondario**: Beige/Pietra (`stone-50`, `stone-100`)
- **Accenti**: Ambra, Blu chiaro
- **Sfondo**: Bianco e gradienti soft

### Tipografia
- **Titoli**: Font light per eleganza
- **Corpo**: Leggibile e professionale
- **CTA**: Bold per massima visibilità

### Responsive
- Mobile-first design
- Menu hamburger funzionante su mobile
- Calendario Calendly ottimizzato per mobile
- Layout fluido e adattivo

## 📞 Contatti

### Institut Kryzalid
- **Indirizzo**: Rue Principale 44, 1902 Evionnaz, Valais
- **Telefono**: +41 78 444 01 01
- **WhatsApp**: +41 78 444 01 01
- **Orari**: Lundi - Samedi (sur rendez-vous)

### Massaggiatrice
- **Nome**: Caroline Maret
- **Esperienza**: 15+ anni
- **Specializzazione**: Approccio intuitivo e personalizzato

## 🔧 File Importanti

### Frontend
- `/app/frontend/src/pages/Booking.jsx` - Pagina prenotazione con Calendly
- `/app/frontend/src/pages/Massages.jsx` - Lista massaggi con pulsanti prenotazione
- `/app/frontend/src/config/calendly.js` - **CONFIGURAZIONE CALENDLY** ⚠️
- `/app/frontend/src/components/Layout.jsx` - Header e Footer
- `/app/frontend/src/App.js` - Routing principale

### Backend
- `/app/backend/server.py` - API FastAPI
- `/app/backend/models.py` - Modelli dati
- `/app/backend/routes/reservations.py` - Endpoints prenotazioni (backup)

## 🚨 Importante

### Prima di Andare Live:
1. ✅ Configurare account Calendly
2. ✅ Impostare disponibilità e orari
3. ✅ Creare tipi di eventi per ogni massaggio
4. ✅ Inserire il link Calendly in `/config/calendly.js`
5. ✅ Testare il sistema di prenotazione
6. ✅ Verificare email di conferma
7. ✅ Testare su mobile

### Backup System:
Il sito include anche un sistema di prenotazione via form (pagina `/contact`) che salva le richieste nel database MongoDB come backup, ma l'esperienza principale è con Calendly per la conferma immediata.

## 📝 Testi in Francese

Tutti i testi sono in francese come richiesto:
- "Prendre Rendez-vous"
- "Choisissez un créneau disponible. La confirmation est immédiate."
- "Vous ne verrez que les horaires pendant lesquels je suis disponible."
- "Si le calendrier ne s'affiche pas, cliquez ici pour réserver."
- "Réserver Maintenant"

## 🎯 Risultato

Un sistema di prenotazione professionale, automatico e user-friendly che:
- Elimina il lavoro manuale di conferma appuntamenti
- Migliora l'esperienza utente con conferma immediata
- Riduce no-show con promemoria automatici
- Gestisce orari, pause e ferie facilmente
- È completamente responsive e accessibile

---

**Sviluppato con ❤️ per Institut Kryzalid**
