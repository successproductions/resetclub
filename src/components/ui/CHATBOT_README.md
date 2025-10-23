# ChatBot Component - Nahed AI Voice Script

## Overview
This chatbot component implements the **official voice script** from the document "SCRIPT VOCAL OFFICIEL – NAHED AI / RESET CLUB™ Version v1 – Flow 10 Phases".

## Current Implementation
- **Text-based chatbot** with exact copywriting from the official script
- **Voice indicators** (🎧 icon and microphone SVG) show where voice will be added in the future
- All 10 phases are implemented with the exact copywriting

## Future Enhancement: Voice Integration
When ElevenLabs or voice API is available, add voice playback to each bot message:

### Voice Parameters (from official script):
- **Tone**: Feminine, soft, reassuring, slow, luminous, professional
- **Speed**: 0.9x (calm delivery)
- **Character**: Holistic wellness coach, confident and calming
- **Background**: 432 Hz frequency - "Light & Bloom" or "Serenity Flow"
- **Pauses**: 2-3 seconds between key phrases

### Implementation Plan:
1. Each bot message should trigger audio playback
2. Add audio files for each phase (10 files of 45-90 seconds)
3. Add soft chime sound between phases
4. Include branding audio: "Reset Club™ – Là où la science rencontre l'âme"

## 10 Phases Flow

### Phase 1 - Accueil émotionnel 🩰
Welcome message from Nahed with 3 options

### Phase 2 - Identification du besoin dominant 🌸
Personalized response based on user's choice (weight loss, energy, or balance)

### Phase 3 - Présentation du Bilan Reset™ 💎
Introduction to Reset™ Assessment with InBody + OligoCheck technology

### Phase 4 - Humanisation 🎥
Personal introduction from Nahed (optional based on user interest)

### Phase 5 - Call To Action bifurqué 💬
User chooses: Book now, Talk to advisor, or Learn more

### Phase 6 - Micro-interactions intelligentes 🧠
Handles objections: hesitation, price concerns, distance

### Phase 7 - Bonus Mini Reset à la Maison™ 🎁
Offers free 3-day Mini Reset program

### Phase 8 - Minimisation des frictions ⚙️
Smooth transitions (currently handled automatically)

### Phase 9 - A/B Testing 🔁
Three tone variations (soothing, energizing, scientific) - ready for testing

### Phase 10 - Human Touch Voice AI 💎
Closing motivational message

## Translation Files
- French: `locales/fr.json` → `ChatBot` section
- English: `locales/en.json` → `ChatBot` section

## Notes
- ✅ Exact copywriting from official document
- ✅ Voice indicators (microphone icon + 🎧) on all bot messages
- ⏳ Voice audio files to be added when ElevenLabs is available
- ✅ Bilingual support (FR/EN)
- ✅ Smooth conversation flow with typing indicators
