'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetClubChatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: `Bonjour 🌸
Je suis Nahed, fondatrice du RESET Club™️ Rabat,
le premier centre féminin de biohacking & transformation 360° au Maroc.

Ici, on ne te change pas.
On te reconnecte à la femme que tu es vraiment. ✨

Avant de commencer, dis-moi ce que tu veux explorer :`,
      sender: 'bot',
      options: [
        '🔸 Découvrir le Bilan Reset™️',
        '🔸 Comprendre les bénéfices du RESET Club™️',
        '🔸 Réserver mon Bilan offert',
        '🔸 Parler à une conseillère bien-être'
      ]
    },
    {
      id: '0-closing',
      text: `Ton reset commence ici… respire profondément.`,
      sender: 'bot'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    email: '',
    phoneCode: '+212',
    phone: '',
    objective: ''
  });
  const [collectingInfo, setCollectingInfo] = useState(false);
  const [infoStep, setInfoStep] = useState(0);
  const [showPhoneCodeSelector, setShowPhoneCodeSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const responses = {
    phase1: {
      text: `Le RESET Club™️ repose sur une approche exclusive :

IN – OUT – RESET

🥗 IN : Nutrition anti-inflammatoire & vitalité cellulaire
⚙️ OUT : Technologies avancées pour remodelage, drainage & optimisation métabolique
🧘‍♀️ RESET : Stress, sommeil, mindset & rééquilibrage hormonal

Ces 3 axes travaillent ensemble pour réinitialiser ton énergie, ton corps et ta clarté mentale.

Souhaites-tu que je t'explique :`,
      options: [
        '🔸 Comment fonctionne le Bilan Reset™️',
        '🔸 Quels résultats concrets tu peux attendre'
      ]
    },
    phase2: {
      text: `Le Bilan Reset™️ est la première étape incontournable de ta transformation.
En 30 minutes, nous analysons ce que ton corps ne dit à personne :

•  Composition corporelle, rétention & inflammation
•  Carences minérales, stress oxydatif & métabolisme cellulaire
•  Énergie, sommeil & charge de stress
•  Freins invisibles qui bloquent ton métabolisme

Tu repars avec une lecture claire, simple et actionnable de ton corps.

Tu préfères :`,
      options: [
        '🔸 Lire témoignage de nos clientes',
        '🔸 Réserver ton bilan maintenant'
      ]
    },
    phase3: {
      text: `💖 "En une semaine, j'ai perdu 3 cm et retrouvé une énergie que j'avais oubliée." — Amal, 45 ans
💤 "Après des mois d'insomnie, j'ai enfin dormi comme un bébé." — Lina, 36 ans
🔥 "Mon ventre a dégonflé et je me sens plus légère." — Samia, 32 ans`,
      options: [
        '🔸 Réserver mon Bilan Reset Offert',
        '🔸 En savoir plus sur le centre'
      ]
    },
    phase4: {
      text: `Au RESET Club™️ tu vivras une expérience immersive :

•  Un accueil personnalisé dans un espace sensoriel
•  Des technologies exclusives et de dernière génération
•  Des protocoles holistiques élaborés par des expertes en santé intégrative

Ici, ton corps cesse d'être une énigme.
Il devient lisible, compréhensible et transformable.

Tu veux :`,
      options: [
        '🔸 Voir nos protocoles exclusifs',
        '🔸 Réserver mon diagnostic gratuit'
      ]
    },
    phase5: {
      text: `En réalisant ton Bilan Reset™️, tu vas :

💪 Identifier la vraie origine de ton stockage et de ta fatigue
🧠 Comprendre ton stress, tes hormones & ton système nerveux
💧 Accélérer ton métabolisme & retrouver ton énergie profonde
🌙 Améliorer ton sommeil et réduire la charge mentale
🔥 Recevoir un plan sur-mesure, basé sur ta biologie et ta vérité intérieure

🎁 Ce mois-ci, 50 bilans offerts par Nahed
(places limitées pour garantir un suivi personnalisé)`,
      options: [
        '🔘 Oui, je veux mon bilan offert',
        '🔘 Je veux poser une question d\'abord'
      ]
    }
  };

  const infoQuestions = [
    `Super 🌿
Avant de t'envoyer ton lien de réservation, j'ai besoin de 4 petites infos :

📋 Ton prénom`,
    '📧 Ton email',
    '📲 Ton numéro WhatsApp',
    `🎯 Ton objectif principal :

Toutes tes informations sont strictement confidentielles.`
  ];

  const objectives = [
    '•  Perte de poids',
    '•  Énergie',
    '•  Sommeil',
    '•  Stress',
    '•  Bien-être global'
  ];

  const addMessage = (text: string, sender: 'bot' | 'user', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (option.includes('Découvrir le Bilan Reset') || option.includes('Comprendre les bénéfices')) {
        addMessage(responses.phase1.text, 'bot', responses.phase1.options);
      } else if (option.includes('Comment fonctionne le Bilan Reset') || option.includes('Quels résultats concrets')) {
        addMessage(responses.phase2.text, 'bot', responses.phase2.options);
      } else if (option.includes('Lire témoignage')) {
        addMessage(responses.phase3.text, 'bot', responses.phase3.options);
      } else if (option.includes('En savoir plus sur le centre')) {
        addMessage(responses.phase4.text, 'bot', responses.phase4.options);
      } else if (option.includes('Voir nos protocoles')) {
        addMessage(responses.phase5.text, 'bot', responses.phase5.options);
      } else if (option.includes('Réserver mon Bilan Reset™️ offert')) {
        // Show Phase 8 - Final message (MUST be before generic 'Réserver')
        addMessage(
          `🌸 Bravo ${userInfo.firstName}.
Tu viens d'activer ton RESET personnel.

Tu recevras dans quelques heures un message de notre équipe pour confirmer ton rendez-vous.

En attendant…
Respire profondément.
Bois un grand verre d'eau.
Et prépare-toi à rencontrer la version de toi que tu as toujours méritée.`,
          'bot',
          ['💬 Contacter sur WhatsApp']
        );
      } else if (option.includes('Recevoir la brochure détaillée')) {
        addMessage('📄 La brochure détaillée du RESET Club™️ va t\'être envoyée par email dans les prochaines minutes. Tu peux aussi nous contacter.', 'bot', ['💬 Contacter sur WhatsApp']);
      } else if (option.includes('Réserver') || option.includes('Oui, je veux mon bilan offert')) {
        setCollectingInfo(true);
        setInfoStep(0);
        addMessage(infoQuestions[0], 'bot');
      } else if (option.includes('Je veux poser une question d\'abord')) {
        addMessage('Bien sûr ! Pour toute question, notre équipe est disponible sur WhatsApp pour t\'accompagner personnellement. 💬', 'bot', ['💬 Contacter sur WhatsApp']);
      } else if (option.includes('conseillère bien-être')) {
        addMessage('Parfait ! Un membre de notre équipe va te contacter très bientôt. Tu peux aussi nous joindre directement sur WhatsApp.', 'bot', ['💬 Contacter sur WhatsApp']);
      } else if (option.includes('Contacter sur WhatsApp')) {
        const message = `Bonjour ! Je souhaite réserver mon Bilan Reset™. Mon nom est ${userInfo.firstName || 'Client'}.`;
        window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
      } else if (option.includes('Télécharger la brochure')) {
        window.open('/brochure-reset-club.pdf', '_blank');
      } else if (objectives.includes(option)) {
        setIsTyping(true);
        handleInfoSubmit(option, true);
      }
    }, 100);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string, phoneCode: string) => {
    // Remove spaces
    const cleanPhone = phone.replace(/\s/g, '');

    if (phoneCode === '+212') {
      // Morocco: 0XXXXXXXXX or XXXXXXXXX
      const phoneRegex = /^(0)?[5-7][0-9]{8}$/;
      return phoneRegex.test(cleanPhone);
    } else {
      // International: at least 8 digits
      const phoneRegex = /^[0-9]{8,15}$/;
      return phoneRegex.test(cleanPhone);
    }
  };

  const handleInfoSubmit = (value: string, isObjectiveSelection = false) => {
    if (!isObjectiveSelection) {
      addMessage(value, 'user');
    }
    setIsTyping(true);

    if (infoStep === 0) {
      setUserInfo(prev => ({ ...prev, firstName: value }));
      setTimeout(() => {
        setIsTyping(false);
        addMessage(infoQuestions[1], 'bot');
        setInfoStep(1);
      }, 1000);
    } else if (infoStep === 1) {
      // Validate email
      if (!validateEmail(value)) {
        setTimeout(() => {
          setIsTyping(false);
          addMessage('Oups ! Cet email ne semble pas valide. Peux-tu vérifier et réessayer ? 📧', 'bot');
        }, 1000);
        return;
      }
      setUserInfo(prev => ({ ...prev, email: value }));
      setTimeout(() => {
        setIsTyping(false);
        setShowPhoneCodeSelector(true);
        addMessage(infoQuestions[2], 'bot');
        setInfoStep(2);
      }, 1000);
    } else if (infoStep === 2) {
      // Validate phone
      if (!validatePhone(value, userInfo.phoneCode)) {
        setTimeout(() => {
          setIsTyping(false);
          addMessage(userInfo.phoneCode === '+212'
            ? 'Oups ! Ce numéro ne semble pas valide. Utilise le format marocain : 06XXXXXXXX 📱'
            : 'Oups ! Ce numéro ne semble pas valide. Vérifie le format. 📱', 'bot');
        }, 1000);
        return;
      }
      setUserInfo(prev => ({ ...prev, phone: value }));
      setShowPhoneCodeSelector(false);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(infoQuestions[3], 'bot', objectives);
        setInfoStep(3);
      }, 1000);
    } else if (infoStep === 3) {
      setUserInfo(prev => ({ ...prev, objective: value }));
      setCollectingInfo(false);
      // Phase 7 - Confirmation with buttons
      setTimeout(() => {
        setIsTyping(false);
        addMessage(
          `🎉 Merci ${userInfo.firstName}, ton inscription est validée.

💎 Il reste encore quelques places libres parmi les 50 bilans offerts ce mois-ci.
Je t'invite à réserver ton créneau avant fermeture des disponibilités :`,
          'bot',
          [
            '🔘 Réserver mon Bilan Reset™️ offert',
            '🔘 Recevoir la brochure détaillée'
          ]
        );
      }, 1200);
    }
  };

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && collectingInfo && infoStep < 3) {
      handleInfoSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-graphik">
      <div className="bg-white text-black w-[380px] h-[600px] shadow-2xl flex flex-col overflow-hidden border border-black/10">
        {/* Header */}
        <div className="bg-[#f5efe8] p-4 flex items-center justify-between border-b border-black/10">
          <div>
            <h3 className="font-medium text-lg">RESET Club™</h3>
            <p className="text-xs text-black/60">Nahed, Fondatrice</p>
          </div>
          <button
            onClick={onClose}
            className="text-black/60 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-[#f5efe8] text-black'
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.text}</p>
                </div>
              </div>

              {message.options && (
                <div className="mt-3 space-y-2 flex flex-col items-end w-full">
                  {message.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="bg-white border border-black/20 text-black px-4 py-3 text-base hover:bg-black hover:text-white transition-all duration-300 text-left w-[85%] min-h-[48px]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#f5efe8] p-3 flex items-center gap-1">
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {collectingInfo && infoStep < 3 && (
          <div className="p-4 border-t border-black/10 bg-[#f5efe8]">
            <div className="flex gap-2">
              {showPhoneCodeSelector && infoStep === 2 && (
                <select
                  value={userInfo.phoneCode}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phoneCode: e.target.value }))}
                  className="px-3 py-2 border border-black/20 focus:outline-none focus:border-black bg-white text-base"
                >
                  <option value="+212">🇲🇦 +212</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+213">🇩🇿 +213</option>
                  <option value="+216">🇹🇳 +216</option>
                </select>
              )}
              <input
                type={infoStep === 1 ? 'email' : infoStep === 2 ? 'tel' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={infoStep === 2 ? (userInfo.phoneCode === '+212' ? '06XXXXXXXX' : 'Numéro de téléphone') : 'Tape ta réponse...'}
                className="flex-1 px-4 py-2 border border-black/20 focus:outline-none focus:border-black bg-white text-base"
              />
              <button
                onClick={handleSend}
                className="bg-black text-white px-4 py-2 hover:bg-black/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
