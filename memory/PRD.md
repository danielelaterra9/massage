# Institut Kryzalid - PRD (Product Requirements Document)

## Project Overview
Sito web per **Institut Kryzalid**, un centro massaggi situato a Evionnaz, Svizzera.
Proprietario: **Caroline Maret** (15+ anni di esperienza in massoterapia)

## Architecture
- **Frontend**: React 19 + TailwindCSS + Radix UI components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Booking System**: Calendly integration (react-calendly)

## Core Features Implemented
- Homepage con hero section e introduzione
- Pagina "À Propos" (Chi Siamo)
- Catalogo completo massaggi con filtri per categoria (Détente, Dos, Spécialisé, Premium)
- Pagina dedicata "Massage Détente Profonde"
- Sistema di personalizzazione servizio
- Integrazione Calendly multi-durata
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
- react-calendly 4.4.0
- FastAPI
- Motor (MongoDB async driver)
- Pydantic

## Design
- Palette colori: rosa (#C0A0A3), lavanda (#E7D7F2), crema (#FAF0E6)
- Font: Dancing Script (titoli), Lora (body)
- Logo: Farfalla Kryzalid personalizzata

## Calendly Configuration
I link Calendly devono essere configurati nel file `/frontend/src/config/calendly.js`
con Event Types separati per ogni durata massaggio.

## What's Been Implemented
- [x] Homepage completa
- [x] Navigazione e layout responsive
- [x] Catalogo massaggi con immagini
- [x] Sistema filtri per categoria
- [x] Integrazione Calendly
- [x] Backend API (health, reservations)
- [x] Database MongoDB per prenotazioni

## Recovered: 31 Gennaio 2026
Repository GitHub: https://github.com/danielelaterra9/massage.git

## Next Tasks
- Configurare i link Calendly personalizzati per ogni durata in `/frontend/src/config/calendly.js`

## Changelog
### 31 Gennaio 2026
- Recuperato progetto da GitHub
- Aggiornata pagina ServiceCustomization con nuovo titolo e 4 servizi supplementari:
  - Massage du cuir chevelu (10 min - CHF 15)
  - Massage du visage (10 min - CHF 15)
  - Cuir chevelu et visage combiné (15 min - CHF 20)
  - Exfoliation des pieds et massage avec crème nourrissante (20 min - CHF 30)
- Implementato calcolo dinamico durata totale e prezzo totale
- Aggiunta funzione getCalendlyUrlForDuration() per selezionare automaticamente il tipo Calendly corretto
- Aggiornata pagina Booking per mostrare récapitulatif completo con servizi, durata e prezzo totale
