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
      text: `Bonjour 

Je suis Nahed, fondatrice du RESET Club™ Rabat, le premier centre de biohacking féminin et transformation 360° au Maroc.

Ici, on ne cherche pas à te transformer. On t'aide à te retrouver.

 Prends une grande respiration… et dis-moi ce que tu veux explorer :`,
      sender: 'bot',
      options: [
        'Comprendre ce qu\'est le Bilan Reset™️',
        'Découvrir les bienfaits du RESET Club™️',
        'Réserver mon Bilan offert',
        'Parler à une conseillère bien-être'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    email: '',
    phone: '',
    objective: ''
  });
  const [collectingInfo, setCollectingInfo] = useState(false);
  const [infoStep, setInfoStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const responses = {
    phase1: {
      text: ` Le RESET Club™️, c'est une approche unique :

IN – OUT – RESET

 IN : Nutrition et vitalité cellulaire
 OUT : Technologies de rajeunissement et drainage
 RESET : Gestion du stress, sommeil, mindset

Ensemble, ces trois piliers t'aident à rééquilibrer ton corps, ton mental et ton énergie.

Souhaites-tu que je t'explique :`,
      options: [
        'Comment le Bilan Reset™️ fonctionne',
        'Les bénéfices que tu peux en attendre'
      ]
    },
    phase2: {
      text: ` Le Bilan Reset™️, c'est la première étape de ta transformation.

En 30 minutes, on dresse la carte intérieure de ton corps :

• Composition corporelle & inflammation (InBody)
• Carences minérales et stress cellulaire (OligoCheck)
• Analyse du sommeil, du stress et du métabolisme

Tu ressors avec une lecture claire de ton énergie, de ton corps et de tes freins invisibles.

Souhaites-tu :`,
      options: [
        'Voir les résultats concrets que d\'autres femmes ont obtenus',
        'Réserver ton bilan maintenant'
      ]
    },
    phase3: {
      text: ` "En une semaine, j'ai retrouvé mon énergie et perdu 3 cm de tour de taille."
— Amal, 45 ans

💧 "Je ne dormais plus depuis des mois. Après mon Reset, j'ai retrouvé un vrai sommeil."
— Lina, 36 ans`,
      options: [
        'Réserver mon Bilan Reset offert',
        'En savoir plus sur le centre'
      ]
    },
    phase4: {
      text: ` Une expérience immersive, où chaque détail compte :

• Accueil personnalisé dans un espace sensoriel haut de gamme
• Technologies exclusives (sauna infrarouge, Dream Machine, cryothérapie douce)
• Soins guidés par des experts en santé intégrative

 Ton corps ne sera plus un mystère. Tu comprendras pourquoi il bloque, et comment le relancer.

Souhaites-tu :`,
      options: [
        'Voir nos protocoles exclusifs',
        'Réserver mon diagnostic gratuit'
      ]
    },
    phase5: {
      text: ` En réalisant ton Bilan Reset™️, tu vas :

 Identifier la cause réelle de ta fatigue ou de ton stockage
 Comprendre ton stress et ton profil hormonal
 Retrouver ton énergie, ton sommeil et ta légèreté

Et tu bénéficieras d'un plan sur mesure basé sur ta biologie.

 Et en ce moment, Nahed offre 50 bilans gratuits ce mois-ci 🌸`,
      options: [
        'Oui, je veux le mien',
        'Je préfère d\'abord poser une question'
      ]
    }
  };

  const infoQuestions = [
    'Parfait \n\nPour t\'envoyer ton lien de réservation, j\'ai juste besoin de quelques infos rapides.\n\n Quel est ton prénom ?',
    ' Merci ! Et ton email ?',
    ' Parfait. Ton numéro WhatsApp ?',
    ' Enfin, quel est ton objectif principal ?'
  ];

  const objectives = [
    'Perte de poids',
    'Sommeil',
    'Énergie',
    'Stress',
    'Bien-être global'
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

      if (option.includes('Comprendre ce qu\'est le Bilan Reset') || option.includes('Découvrir les bienfaits')) {
        addMessage(responses.phase1.text, 'bot', responses.phase1.options);
      } else if (option.includes('Comment le Bilan Reset™️ fonctionne') || option.includes('Les bénéfices')) {
        addMessage(responses.phase2.text, 'bot', responses.phase2.options);
      } else if (option.includes('Voir les résultats')) {
        addMessage(responses.phase3.text, 'bot', responses.phase3.options);
      } else if (option.includes('En savoir plus sur le centre')) {
        addMessage(responses.phase4.text, 'bot', responses.phase4.options);
      } else if (option.includes('Voir nos protocoles') || option.includes('bénéfices')) {
        addMessage(responses.phase5.text, 'bot', responses.phase5.options);
      } else if (option.includes('Réserver') || option.includes('Oui, je veux le mien')) {
        setCollectingInfo(true);
        setInfoStep(0);
        addMessage(infoQuestions[0], 'bot');
      } else if (option.includes('conseillère')) {
        addMessage(' Parfait ! Un membre de notre équipe va te contacter très bientôt. Tu peux aussi nous joindre directement sur WhatsApp.', 'bot', ['Contacter sur WhatsApp']);
      } else if (option.includes('Contacter sur WhatsApp')) {
        // Redirect to WhatsApp
        window.open('https://wa.me/212600000000', '_blank');
      } else if (objectives.includes(option)) {
        // Handle objective selection - trigger final phase
        setIsTyping(true);
        handleInfoSubmit(option, true);
      }
    }, 100);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
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
        addMessage(infoQuestions[2], 'bot');
        setInfoStep(2);
      }, 1000);
    } else if (infoStep === 2) {
      // Validate phone
      if (!validatePhone(value)) {
        setTimeout(() => {
          setIsTyping(false);
          addMessage('Oups ! Ce numéro ne semble pas valide. Utilise le format marocain : 06XXXXXXXX ou +212XXXXXXXXX 📱', 'bot');
        }, 1000);
        return;
      }
      setUserInfo(prev => ({ ...prev, phone: value }));
      setTimeout(() => {
        setIsTyping(false);
        addMessage(infoQuestions[3], 'bot', objectives);
        setInfoStep(3);
      }, 1000);
    } else if (infoStep === 3) {
      setUserInfo(prev => ({ ...prev, objective: value }));
      setCollectingInfo(false);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(
          `Bravo, ${userInfo.firstName}.

Tu viens d'activer ton RESET personnel.

Tu recevras dans quelques heures un message de notre équipe pour confirmer ton créneau.

En attendant, bois un grand verre d'eau…
Respire profondément…
Et prépare-toi à rencontrer la meilleure version de toi-même. 💫`,
          'bot'
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
              <input
                type={infoStep === 1 ? 'email' : infoStep === 2 ? 'tel' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tape ta réponse..."
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
