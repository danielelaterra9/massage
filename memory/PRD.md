# Institut Kryzalid - PRD (Product Requirements Document)

## Project Overview
Sito web per **Institut Kryzalid**, un centro massaggi situato a Evionnaz, Svizzera.
Proprietario: **Caroline Maret** (15+ anni di esperienza in massoterapia)

## Architecture
- **Frontend**: React 19 + TailwindCSS + Radix UI components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Booking System**: Agenda.ch iframe embed (https://book.agenda.ch?companyId=18878)

## Core Features Implemented
- Homepage con hero section e introduzione
- Pagina "À Propos" (Chi Siamo)
- Catalogo completo massaggi con filtri per categoria (Détente, Dos, Spécialisé, Premium)
- Pagina dedicata "Massage Détente Profonde"
- Sistema di personalizzazione servizio
- Integrazione Agenda.ch tramite iframe responsivo (min-height 800px)
- Pagina contatti/prenotazione
- Layout responsive con navigazione mobile

## Massaggi Disponibili (13 tipi)
1. Massage Relaxant (75 min - CHF 140)
2. Massage Détente Profond (90 min - CHF 165)
3. Dos Détente (30 min - CHF 65)
4. Dos Profond (60 min - CHF 120)
5. Femme Enceinte (60 min - CHF 120)
6. Pierres Chaudes (90 min - CHF 175)
7. Gommage Massage 60' (90 min - CHF 180)
8. Gommage Massage 90' (120 min - CHF 215)
9. Massage à la Bougie (75 min - CHF 150)
10. Lomi-Lomi (90 min - CHF 165)
11. Spécial Pieds (45 min - CHF 85)
12. Anti-cellulite (60 min - CHF 120)
13. Tête Nuque Visage (30 min - CHF 65)

## Tech Stack
- React 19.0.0
- React Router DOM 7.5.1
- TailwindCSS 3.4.17
- Radix UI Components
- FastAPI
- Motor (MongoDB async driver)
- Pydantic

## Design
- Palette colori: rosa (#C0A0A3), lavanda (#E7D7F2), crema (#FAF0E6)
- Font: Dancing Script (titoli), Lora (body)
- Logo: Farfalla Kryzalid personalizzata

## Booking Configuration
Il sistema di prenotazione utilizza Agenda.ch tramite iframe embed.
URL: `https://book.agenda.ch?companyId=18878`
Integrato nella pagina `/reservation` (Booking.jsx) con altezza minima 800px e responsive design.

## What's Been Implemented
- [x] Homepage completa con carosello testimonianze
- [x] Navigazione e layout responsive
- [x] Catalogo massaggi con immagini, prezzi, durate aggiornati
- [x] Sistema filtri per categoria
- [x] Personalizzazione servizio con calcolo dinamico durata/prezzo
- [x] Integrazione Agenda.ch (iframe)
- [x] Rimozione branding Emergent
- [x] Backend API (health, reservations)
- [x] Database MongoDB per prenotazioni

## Recovered: 31 Gennaio 2026
Repository GitHub: https://github.com/danielelaterra9/massage.git

## Next Tasks
- Test E2E del flusso prenotazione tramite Agenda.ch
- Risoluzione SSL/Cloudflare Error 1001 sul dominio personalizzato (BLOCCATO - richiede Supporto Emergent)

## Changelog
### 31 Gennaio 2026
- Recuperato progetto da GitHub
- Aggiornata pagina ServiceCustomization con nuovo titolo e 4 servizi supplementari:
  - Massage du cuir chevelu (10 min - CHF 15)
  - Massage du visage (10 min - CHF 15)
  - Cuir chevelu et visage combiné (15 min - CHF 20)
  - Exfoliation des pieds et massage avec crème nourrissante (20 min - CHF 30)
- Implementato calcolo dinamico durata totale e prezzo totale
- Aggiornata pagina Booking per mostrare récapitulatif completo con servizi, durata e prezzo totale

### 16 Febbraio 2026
- **Sostituito completamente Calendly/Google Calendar con Agenda.ch iframe** (`https://book.agenda.ch?companyId=18878`)
- Rimossa dipendenza `react-calendly` da package.json
- Eliminati file deprecati: `BookingCalendar.jsx`, `config/calendly.js`, `backend/google_calendar.py`, `backend/routes/calendar.py`
- Pulito `server.py` da import del calendar router
- Rinominato `calculateCalendlyDuration` → `calculateSlotDuration` in ServiceCustomization.jsx
- Verificato funzionamento iframe Agenda.ch sulla pagina `/reservation`
