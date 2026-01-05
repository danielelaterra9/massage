# GUIDA RAPIDA: Configurazione Calendly Multi-Durata

## 🎯 Obiettivo
Configurare Calendly con **Event Types separati** per ogni durata di massaggio, così gli orari disponibili si adattano automaticamente alla lunghezza del trattamento.

## 📋 Checklist Configurazione

### Fase 1: Setup Account Calendly
- [ ] Creare account su https://calendly.com
- [ ] Impostare fuso orario: **Europe/Zurich**
- [ ] Configurare orari di lavoro: **Lundi - Samedi**
- [ ] Impostare orari: mattina e pomeriggio

### Fase 2: Creare Event Types (6 tipi)

#### ✅ Event Type 1: Massage 30 min
```
Nome: Massage 30 min (Dos Détente / Tête Nuque Visage)
Durata: 30 minuti
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-30min
```
**Massaggi che usano questo tipo:**
- Dos Détente
- Tête Nuque Visage

---

#### ✅ Event Type 2: Massage 45 min
```
Nome: Massage 45 min (Spécial Pieds)
Durata: 45 minuti
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-45min
```
**Massaggi che usano questo tipo:**
- Spécial Pieds

---

#### ✅ Event Type 3: Massage 60 min
```
Nome: Massage 60 min
Durata: 60 minuti (1 ora)
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-60min
```
**Massaggi che usano questo tipo:**
- Dos Profond
- Femme Enceinte
- Anti-cellulite

---

#### ✅ Event Type 4: Massage 75 min
```
Nome: Massage 75 min (Relaxant / Bougie)
Durata: 75 minuti (1h15)
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-75min
```
**Massaggi che usano questo tipo:**
- Massage Relaxant
- Massage à la Bougie

---

#### ✅ Event Type 5: Massage 90 min
```
Nome: Massage 90 min
Durata: 90 minuti (1h30)
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-90min
```
**Massaggi che usano questo tipo:**
- Massage Détente Profond
- Pierres Chaudes
- Lomi-Lomi
- Gommage Massage 60'

---

#### ✅ Event Type 6: Massage 120 min
```
Nome: Massage 120 min (Gommage Complet)
Durata: 120 minuti (2 ore)
Buffer: 15 minuti dopo
Link generato: https://calendly.com/TUONOME/massage-120min
```
**Massaggi che usano questo tipo:**
- Gommage Massage 90'

---

### Fase 3: Configurare Campi Modulo (per tutti gli Event Types)

Per ogni Event Type, aggiungi questi campi:
- [ ] **Nom** (obbligatorio)
- [ ] **Email** (obbligatorio)
- [ ] **Téléphone** (opzionale ma consigliato)
- [ ] **Notes/Message** (opzionale)

### Fase 4: Personalizzare Email di Conferma

Per ogni Event Type, personalizza:
- [ ] Email di conferma in francese
- [ ] Promemoria 24 ore prima
- [ ] Promemoria 1 ora prima (se hai piano premium)

### Fase 5: Inserire Link nel Sito

Apri il file: `/app/frontend/src/config/calendly.js`

Sostituisci i placeholder con i tuoi link:

```javascript
EVENT_TYPES: {
  'MASSAGE_30MIN': 'https://calendly.com/TUONOME/massage-30min',  // ← Il tuo link
  'MASSAGE_45MIN': 'https://calendly.com/TUONOME/massage-45min',  // ← Il tuo link
  'MASSAGE_60MIN': 'https://calendly.com/TUONOME/massage-60min',  // ← Il tuo link
  'MASSAGE_75MIN': 'https://calendly.com/TUONOME/massage-75min',  // ← Il tuo link
  'MASSAGE_90MIN': 'https://calendly.com/TUONOME/massage-90min',  // ← Il tuo link
  'MASSAGE_120MIN': 'https://calendly.com/TUONOME/massage-120min', // ← Il tuo link
}
```

### Fase 6: Test

- [ ] Salvare il file `calendly.js`
- [ ] Testare prenotazione da pagina Massages
- [ ] Verificare che ogni massaggio reindirizza al link corretto
- [ ] Controllare che gli orari disponibili si adattano alla durata
- [ ] Testare su mobile
- [ ] Fare una prenotazione di prova

## 💡 Esempio di Test

1. Vai su: https://tuosito.com/massages
2. Clicca "Réserver Maintenant" su "Pierres Chaudes" (90 min)
3. Dovresti vedere:
   - "Massage sélectionné: Pierres Chaudes"
   - "Les créneaux affichés sont adaptés à la durée de ce massage"
   - Widget Calendly che mostra solo slot dove hai 90 min + 15 buffer disponibili

## 🚨 Domande Frequenti

**Q: Devo creare tutti e 6 gli Event Types?**
A: Sì, ogni durata diversa necessita del suo Event Type per mostrare correttamente gli orari disponibili.

**Q: Posso raggruppare massaggi di durata simile?**
A: Sì! Ad esempio, tutti i massaggi di 60 minuti condividono lo stesso Event Type "Massage 60 min".

**Q: Il buffer di 15 minuti è obbligatorio?**
A: No, puoi regolarlo (10-20 min), ma è consigliato per evitare stress tra appuntamenti.

**Q: Cosa succede se dimentico di configurare un Event Type?**
A: Il sistema userà un fallback (60 min), ma gli orari potrebbero non essere ottimali.

**Q: Come funziona se ho due massaggi di 90 min in mattinata?**
A: Calendly gestisce automaticamente. Se il primo è 09:00-10:45, il secondo slot disponibile sarà 10:45 o dopo.

**Q: Posso modificare le durate dopo?**
A: Sì, ma dovrai aggiornare anche il mapping in `calendly.js` se cambi le durate.

## 📞 Supporto

Per domande sulla configurazione Calendly:
- Documentazione Calendly: https://help.calendly.com/
- Supporto Calendly: https://calendly.com/support

---

**Creato per Institut Kryzalid** ✨
Sistema di prenotazione automatico con orari adattati alla durata del massaggio
