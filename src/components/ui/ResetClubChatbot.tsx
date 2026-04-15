'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import MembershipApplicationForm from './MembershipApplicationForm';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
  isFormRequest?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetClubChatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLastMessage = () => {
    // Scroll to show only the message text, not the buttons
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // Only auto-scroll when typing indicator is shown
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showStartMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addMessage = (text: string, sender: 'bot' | 'user', options?: string[], isFormRequest?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      options,
      isFormRequest
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, options?: string[], delay = 1000, isFormRequest?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, 'bot', options, isFormRequest);
      // Scroll to show the message text after a short delay
      setTimeout(() => {
        scrollToLastMessage();
      }, 100);
    }, delay);
  };

  // 🟣 BRANCH 0: START — Message d'accueil
  const showStartMessage = () => {
    addBotMessage(
      `Bonjour 🌸

Je suis l'assistante virtuelle du RESET Club™️ Rabat, le premier centre féminin de biohacking & transformation 360° au Maroc.

Ici, on ne te change pas.
On te reconnecte à la femme que tu es vraiment. ✨

Que souhaites-tu découvrir ?`,
      [
        'Découvrir le concept',
        'Comprendre le Bilan Reset™',
        'Réserver mon Bilan Offert',
        'Voir les témoignages',
        'Voir l\'expérience RESET',
        'Parler à une conseillère'
      ],
      500
    );
  };

  // 🟦 BRANCH 1: Découvrir le concept
  const showConceptBranch = () => {
    addBotMessage(
      `🌿 Le RESET Club™️ repose sur une approche holistique exclusive :

IN / OUT / RESET

🥗 IN : Nutrition anti-inflammatoire & vitalité cellulaire
Ton alimentation devient ton premier médicament. On t'apprend à nourrir ton corps avec ce qui lui permet de régénérer, réparer, brûler.

⚙️ OUT : Technologies avancées pour remodelage, drainage & optimisation métabolique
On utilise des protocoles biohacking de pointe : compression pneumatique, infrarouge lointain, cryothérapie localisée, stimulation musculaire… pour activer ton métabolisme et libérer ce qui stagne.

🧘‍♀️ RESET : Stress, sommeil, mindset & rééquilibrage hormonal
Parce qu'un corps tendu ne maigrit pas. On travaille ton système nerveux, ta récupération, ta clarté mentale. On apaise pour transformer.

Ces 3 axes travaillent ensemble pour réinitialiser ton énergie, ton corps et ta clarté mentale.`,
      [
        'Comprendre le Bilan Reset™',
        'Voir les témoignages',
        'Réserver mon Bilan Offert',
        'Menu principal'
      ]
    );
  };

  // 🟩 BRANCH 2: Comprendre le Bilan Reset™
  const showBilanBranch = () => {
    addBotMessage(
      `💎 Le Bilan Reset™ est la première étape incontournable de ta transformation.

En 30 minutes, nous analysons ce que ton corps ne dit à personne :

📊 Composition corporelle complète
• Masse grasse / masse musculaire / eau corporelle
• Répartition précise par zones (bras, tronc, jambes)
• Détection de la rétention d'eau et inflammation

🔬 Analyses biologiques avancées
• Carences minérales (magnésium, calcium, zinc...)
• Stress oxydatif & capacité antioxydante
• Métabolisme cellulaire & énergie mitochondriale

💪 Évaluation fonctionnelle
• Niveau d'énergie et vitalité
• Qualité du sommeil et récupération
• Charge de stress et équilibre nerveux

🔍 Identification des freins invisibles
• Blocages métaboliques qui empêchent la perte de poids
• Déséquilibres hormonaux cachés
• Inflammation chronique silencieuse

Tu repars avec une lecture claire, simple et actionnable de ton corps.
Plus de doutes. Juste de la clarté.`,
      [
        'Voir les bénéfices du bilan',
        'Voir les témoignages',
        'Réserver mon Bilan',
        'Poser une question',
        'Menu principal'
      ]
    );
  };

  // 🟧 BRANCH 3: Témoignages
  const showTestimonialsBranch = () => {
    addBotMessage(
      `💖 Ce que nos membres disent de leur expérience RESET :

✨ "En une semaine, j'ai perdu 3 cm de tour de taille et retrouvé une énergie que j'avais oubliée. Le Bilan Reset m'a ouvert les yeux sur ce qui bloquait mon corps depuis des années."
— Amal, 45 ans, cadre supérieure

💤 "Après 6 mois d'insomnie, j'ai enfin dormi comme un bébé. Les protocoles RESET ont calmé mon système nerveux en profondeur."
— Lina, 36 ans, entrepreneure

🔥 "Mon ventre a dégonflé en 48h. J'ai compris que ce n'était pas de la graisse, mais de l'inflammation. Le RESET Club m'a sauvée."
— Samia, 32 ans, maman de 2 enfants

🌸 "Je ne me suis jamais sentie aussi bien dans ma peau. Ce n'est pas qu'un centre, c'est une transformation de vie."
— Yasmine, 41 ans, consultante

💎 "J'ai essayé tous les régimes. Rien ne marchait. Le Bilan Reset m'a montré pourquoi. Maintenant je comprends mon corps."
— Nadia, 38 ans, professeure`,
      [
        'Réserver mon Bilan Offert',
        'Voir l\'expérience RESET',
        'Menu principal'
      ]
    );
  };

  // 🟨 BRANCH 4: L'Expérience RESET
  const showExperienceBranch = () => {
    addBotMessage(
      `🌟 L'EXPÉRIENCE RESET CLUB™️

Dès que tu franchis notre porte, tu entres dans un univers pensé pour toi :

🏛️ Un espace sensoriel unique
• Design minimaliste et apaisant
• Lumière tamisée et ambiance zen
• Parfums naturels et musique biofréquentielle
• Vestiaires privatifs et douches sensorielles

👩‍⚕️ Un accompagnement personnalisé
• Accueil par une experte en santé intégrative
• Écoute profonde de ton histoire et de tes besoins
• Protocoles adaptés à TON corps, pas à un standard
• Suivi régulier et ajustements en temps réel

⚡ Technologies exclusives de dernière génération
• Ballancer Pro : drainage lymphatique par compression pneumatique
• Infrathérapie : détox profonde par infrarouge lointain
• Cryolipolyse locale : activation métabolique ciblée
• EMS : électrostimulation musculaire pour tonification
• LED Thérapie : régénération cellulaire et anti-âge
• Cohérence cardiaque : apaisement du système nerveux

🎯 Des protocoles holistiques élaborés par des expertes
• Combinaisons scientifiquement prouvées
• Synergie entre nutrition, technologies et mindset
• Approche 360° : corps, esprit, énergie

Ici, ton corps cesse d'être une énigme.
Il devient lisible, compréhensible et transformable.`,
      [
        'Réserver mon Bilan Offert',
        'Menu principal'
      ]
    );
  };

  // 🟪 BRANCH 5: Bénéfices du Bilan Reset™
  const showBenefitsBranch = () => {
    addBotMessage(
      `🎁 LES BÉNÉFICES DU BILAN RESET™

En réalisant ton Bilan Reset™️, tu vas :

💪 Identifier la vraie origine de ton stockage et de ta fatigue
Plus de mystère. Tu sauras EXACTEMENT pourquoi tu stockes, où, et comment inverser le processus.

🧠 Comprendre ton stress, tes hormones & ton système nerveux
On lit ton corps comme une carte. Tu découvres les déséquilibres cachés qui sabotent ta transformation.

💧 Accélérer ton métabolisme & retrouver ton énergie profonde
On réveille tes cellules. Ton corps se remet à brûler, drainer, régénérer.

🌙 Améliorer ton sommeil et réduire la charge mentale
Un système nerveux apaisé = un corps qui récupère = une femme qui se lève légère et puissante.

🔥 Recevoir un plan sur-mesure, basé sur ta biologie et ta vérité intérieure
Pas de copier-coller. Un protocole conçu pour TOI, avec tes contraintes, tes objectifs, ta réalité.

🎁 OFFRE EXCLUSIVE
50 bilans offerts par Nahed ce mois-ci
(valeur 800 DH)

Places limitées pour garantir un suivi personnalisé de qualité.`,
      [
        'Oui, je veux mon Bilan Offert',
        'J\'ai une question',
        'Menu principal'
      ]
    );
  };

  // 🔴 BRANCH 6: Réservation avec vérification localStorage
  const showReservationBranch = () => {
    // Check if form has been submitted within last 24 hours
    let formSubmitted = false;

    if (typeof window !== 'undefined') {
      const submitted = localStorage.getItem('resetclub_membership_form_submitted') === 'true';
      const submissionDate = localStorage.getItem('resetclub_membership_form_date');

      if (submitted && submissionDate) {
        const submittedAt = new Date(submissionDate);
        const now = new Date();
        const hoursDiff = (now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60);

        // If more than 24 hours have passed, clear the restriction
        if (hoursDiff >= 24) {
          localStorage.removeItem('resetclub_membership_form_submitted');
          localStorage.removeItem('resetclub_membership_form_date');
          formSubmitted = false;
        } else {
          formSubmitted = true;
        }
      }
    }

    if (formSubmitted) {
      // User already filled the form - calculate remaining time
      const submissionDate = localStorage.getItem('resetclub_membership_form_date');
      // let remainingMessage = '';

      if (submissionDate) {
        // const submittedAt = new Date(submissionDate);
        // const now = new Date();
        // const hoursRemaining = 24 - ((now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60));
        // const hoursRemainingRounded = Math.ceil(hoursRemaining);

        // if (hoursRemainingRounded > 1) {
        //   remainingMessage = `\n⏰ Vous pourrez remplir un nouveau formulaire dans environ ${hoursRemainingRounded} heures.`;
        // } else {
        //   remainingMessage = `\n⏰ Vous pourrez remplir un nouveau formulaire dans moins d'une heure.`;
        // }
      }

      addBotMessage(
        `⚠️ Vous avez déjà rempli le formulaire du diagnostic

Si vous souhaitez avoir plus d'informations ou poser une question, contactez notre équipe via WhatsApp.

Notre équipe se fera un plaisir de vous aider. 💬`,
        [
          'Contacter l\'équipe'
        ],
        800
      );
    } else {
      // User hasn't filled the form yet
      addBotMessage(
        `🌿 Pour réserver votre Bilan Reset™️, merci de remplir ce formulaire unique.

⚠️ N.B. : Vous ne pouvez remplir ce formulaire qu'une seule fois, vérifiez attentivement vos informations.

Ce formulaire nous permettra de :
• Comprendre vos objectifs personnels
• Préparer votre bilan de manière personnalisée
• Vous proposer le meilleur créneau selon vos disponibilités

Temps de remplissage : 5-7 minutes`,
        [
          'Accéder au formulaire'
        ],
        800,
        true
      );
    }
  };

  // 🟤 BRANCH 7: Parler à une conseillère / Poser une question
  const showContactBranch = () => {
    addBotMessage(
      `💬 Notre équipe est à votre écoute !

Vous pouvez contacter directement une de nos conseillères bien-être via WhatsApp pour :

• Poser vos questions sur le Bilan Reset™️
• Obtenir des informations sur nos protocoles
• Connaître nos disponibilités
• Discuter de vos besoins spécifiques
• Recevoir un accompagnement personnalisé

Notre équipe vous répond généralement en quelques minutes. 🌸`,
      [
        'Contacter l\'équipe',
        'Réserver mon Bilan',
        'Menu principal'
      ]
    );
  };

  // Handle option clicks
  const handleOptionClick = (option: string, isFormRequest?: boolean) => {
    addMessage(option, 'user');

    // Scroll to show the user's message
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Check if this is a form request button
    if (isFormRequest && option === 'Accéder au formulaire') {
      setShowFormPopup(true);
      return;
    }

    // Navigation logic
    if (option === 'Découvrir le concept') {
      showConceptBranch();
    } else if (option === 'Comprendre le Bilan Reset™') {
      showBilanBranch();
    } else if (option === 'Voir les témoignages') {
      showTestimonialsBranch();
    } else if (option === 'Voir l\'expérience RESET') {
      showExperienceBranch();
    } else if (option === 'Voir les bénéfices du bilan') {
      showBenefitsBranch();
    } else if (
      option === 'Réserver mon Bilan Offert' ||
      option === 'Réserver mon Bilan' ||
      option === 'Oui, je veux mon Bilan Offert'
    ) {
      showReservationBranch();
    } else if (
      option === 'Parler à une conseillère' ||
      option === 'J\'ai une question' ||
      option === 'Poser une question'
    ) {
      showContactBranch();
    } else if (option === 'Contacter l\'équipe') {
      const whatsappNumber = '212689464650'; // Replace with actual WhatsApp number
      const message = encodeURIComponent('Bonjour ! Je souhaite obtenir plus d\'informations sur le Bilan Reset™️.');
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

      addBotMessage(
        `🌸 Parfait ! Vous allez être redirigé vers WhatsApp.

En attendant, respirez profondément et hydratez-vous. ✨`,
        [
          'Menu principal'
        ],
        500
      );
    } else if (option === 'Menu principal') {
      showStartMessage();
    }
  };

  const handleFormClose = () => {
    setShowFormPopup(false);

    // Check if form was submitted (localStorage should be updated)
    const formSubmitted = localStorage.getItem('resetclub_membership_form_submitted') === 'true';

    if (formSubmitted) {
      // Show success message after form submission
      addBotMessage(
        `🌸 Bravo ! Vous venez d'activer votre RESET personnel.

Respirez profondément.
Buvez un grand verre d'eau.
Et préparez-vous à rencontrer la version de vous que vous méritez.

Notre équipe va vous contacter très prochainement pour confirmer votre rendez-vous. 💚`,
        [
          'Menu principal'
        ],
        500
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 font-graphik">
        <div className="bg-white text-black w-[380px] h-[600px] shadow-2xl flex flex-col overflow-hidden border border-black/10">
          {/* Header */}
          <div className="bg-[#f5efe8] p-4 flex items-center justify-between border-b border-black/10">
            <div>
              <h3 className="font-medium text-lg">RESET Club™</h3>
              <p className="text-xs text-black/60">Assistante virtuelle</p>
            </div>
            <button
              onClick={onClose}
              className="text-black/60 hover:text-black transition-colors"
              aria-label="Fermer le chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message, index) => (
              <div key={message.id}>
                <div
                  ref={index === messages.length - 1 && message.sender === 'bot' ? lastMessageRef : null}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-black text-white'
                        : 'bg-[#f5efe8] text-black'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>

                {message.options && (
                  <div className="mt-3 space-y-2 flex flex-col items-end w-full">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option, message.isFormRequest)}
                        className="bg-white border border-black/20 text-black px-4 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 text-left w-[85%] min-h-[48px]"
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
        </div>
      </div>

      {/* Membership Form Popup */}
      <MembershipApplicationForm
        isOpen={showFormPopup}
        onClose={handleFormClose}
      />
    </>
  );
}
