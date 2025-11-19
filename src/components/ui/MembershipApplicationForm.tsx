'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface MembershipApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembershipApplicationForm({ isOpen, onClose }: MembershipApplicationFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fr';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phoneCode: '+212',
    phoneNumber: '',
    mainGoal: '',
    howDidYouHear: [] as string[],
    energyLevel: 5,
    sleepQuality: [] as string[],
    stressLevel: '',
    stressDescription: '',
    wellnessHabits: [] as string[],
    nutritionRelation: [] as string[],
    resetPriority: '',
    lifestyleSituation: [] as string[],
    lifestyleDescription: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);
  const [hoursRemaining, setHoursRemaining] = useState(0);

  // Check if user has already submitted the form (within last 24 hours)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const formSubmitted = localStorage.getItem('resetclub_membership_form_submitted') === 'true';
      const submissionDate = localStorage.getItem('resetclub_membership_form_date');

      if (formSubmitted && submissionDate) {
        const submittedAt = new Date(submissionDate);
        const now = new Date();
        const hoursDiff = (now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60);

        // If more than 24 hours have passed, clear the restriction
        if (hoursDiff >= 24) {
          localStorage.removeItem('resetclub_membership_form_submitted');
          localStorage.removeItem('resetclub_membership_form_date');
          setHasAlreadySubmitted(false);
          setHoursRemaining(0);
        } else {
          setHasAlreadySubmitted(true);
          setHoursRemaining(Math.ceil(24 - hoursDiff));
        }
      } else {
        setHasAlreadySubmitted(false);
        setHoursRemaining(0);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine phone code and number
      const submissionData = {
        ...formData,
        phone: `${formData.phoneCode} ${formData.phoneNumber}`,
        timestamp: new Date().toISOString()
      };

      // Prepare JSON data (matching working script format)
      const jsonData = {
        firstName: submissionData.firstName,
        lastName: submissionData.lastName,
        age: submissionData.age,
        email: submissionData.email,
        phone: submissionData.phone,
        mainGoal: submissionData.mainGoal,
        howDidYouHear: submissionData.howDidYouHear.join(', '),
        energyLevel: submissionData.energyLevel.toString(),
        sleepQuality: submissionData.sleepQuality.join(', '),
        stressLevel: submissionData.stressLevel,
        stressDescription: submissionData.stressDescription,
        wellnessHabits: submissionData.wellnessHabits.join(', '),
        nutritionRelation: submissionData.nutritionRelation.join(', '),
        resetPriority: submissionData.resetPriority,
        lifestyleSituation: submissionData.lifestyleSituation.join(', '),
        lifestyleDescription: submissionData.lifestyleDescription,
        timestamp: submissionData.timestamp
      };

      // Send data to Google Sheets
      const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

      if (googleSheetsUrl) {
        // Send JSON to Google Sheets (like working Black Friday script)
        fetch(googleSheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData)
        })
          .then(() => {
            console.log('Form data sent to Google Sheets successfully');
          })
          .catch(error => {
            console.error('Error sending to Google Sheets:', error);
          });
      }

      // Send confirmation emails (to client and direction)
      try {
        await fetch('/api/membership', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData)
        });
        console.log('Confirmation emails sent successfully');
      } catch (error) {
        console.error('Error sending emails:', error);
        // Don't block the form submission if email fails
      }

      // Short delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));

      // Save to localStorage that form has been submitted
      localStorage.setItem('resetclub_membership_form_submitted', 'true');
      localStorage.setItem('resetclub_membership_form_date', new Date().toISOString());

      // Close modal and redirect to thank you page with locale
      onClose();
      router.push(`/${locale}/membership/thank-you`);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      // TODO: Show error message to user
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxGroup = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [name]: newValues
      };
    });
  };

  const handleRangeChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  const handleContactTeam = () => {
    const whatsappNumber = '212600000000'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Bonjour ! J\'ai déjà rempli le formulaire du diagnostic. Je souhaite obtenir plus d\'informations.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-4 font-graphik">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-white text-lg font-graphik">Envoi en cours...</p>
          </div>
        </div>
      )}

      <div className="relative bg-white text-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 md:top-6 right-2 md:right-6 text-black/60 hover:text-black transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content - Show "Already Submitted" or Form */}
        {hasAlreadySubmitted ? (
          // Already Submitted Message
          <div className="p-5 md:p-10 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Vous avez déjà rempli le formulaire du diagnostic
              </h2>

              {/* {hoursRemaining > 0 && (
                <p className="text-black/60 text-sm mb-3">
                  ⏰ Vous pourrez remplir un nouveau formulaire dans environ{' '}
                  <strong>{hoursRemaining} heure{hoursRemaining > 1 ? 's' : ''}</strong>.
                </p>
              )} */}

              <p className="text-black/80 leading-relaxed mb-8">
                Si vous souhaitez avoir plus d&apos;informations ou poser une question, contactez notre équipe via WhatsApp.
              </p>
            </div>

            <button
              onClick={handleContactTeam}
              className="w-full md:w-auto px-8 py-4 bg-black text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-black/90"
            >
              Contacter l&apos;équipe
            </button>
          </div>
        ) : (
          // Form Content
          <div className="p-5 md:p-12">
          <h2 className="text-3xl md:text-4xl font-light mb-2 md:mb-6">
            Diagnostic Biohacking RESET Club™
          </h2>
          <div className="mb-2 md:mb-2 space-y-3">
            <p className="text-black/80 ">
              N.B. : Vous ne pouvez remplir ce formulaire qu’une seule fois. Merci de vérifier attentivement toutes vos informations avant de valider.
            </p>
            <p className="text-black/80 leading-relaxed">
              Pour bien vous accompagner, nous avons besoin de vous connaître . Ce questionnaire a été conçu pour comprendre ton mode de vie, ton énergie, ton stress et tes objectifs afin de t&apos;offrir une analyse personnalisée lors de ton bilan gratuit au RESET Club Rabat, exclusivement réservé aux 50 premières clientes.
            </p>
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
            {/* Section 1: Informations de base */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Informations de base</h3>

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1 md:mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                  placeholder="Votre prénom"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm mb-1 md:mb-2">
                  Nom <span className="text-black/50 text-xs">(facultatif)</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm mb-1 md:mb-2">
                  Âge <span className="text-red-500">*</span>
                </label>
                <select
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                >
                  <option value="">Sélectionnez votre tranche d&apos;âge</option>
                  <option value="18-25">18–25</option>
                  <option value="26-35">26–35</option>
                  <option value="36-45">36–45</option>
                  <option value="46-55">46–55</option>
                  <option value="56+">56+</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-1 md:mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm mb-1 md:mb-2">
                  Numéro de téléphone (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors pr-2"
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
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                    placeholder="6 XX XX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Objectif principal */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Objectif principal</h3>
              <p className="text-lg  text-black/90">Quel est ton objectif principal actuellement ?</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Perdre du poids durablement',
                  'Retrouver ton énergie et ta vitalité',
                  'Améliorer ton sommeil et ta récupération',
                  'Rééquilibrer ton stress et tes hormones',
                  'Optimiser ta performance physique ou mentale',
                  'Retrouve ton pouvoir et ta confiance'

                ].map((goal) => (
                  <label key={goal} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="mainGoal"
                      value={goal}
                      checked={formData.mainGoal === goal}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 3: Connaissance du centre */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Connaissance du centre</h3>
              <p className="text-lg text-black/70">Comment as-tu entendu parler du RESET Club™ ? (plusieurs réponses possibles)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Instagram / Nahed Rachad',
                  'Bouche à oreille',
                  'Influenceuse ou amie',
                  'Événement ou masterclass',
                  'Presse ou TV',
                  'Autre'
                ].map((source) => (
                  <label key={source} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.howDidYouHear.includes(source)}
                      onChange={() => handleCheckboxGroup('howDidYouHear', source)}
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 4: Niveau d'énergie */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Niveau d&apos;énergie actuel</h3>
              <p className="text-lg text-black/70">Sur une échelle de 1 à 10, comment évalues-tu ton niveau d&apos;énergie moyen dans la journée ?</p>
              <p className="text-xs text-black/50">(1 = épuisée / 10 = pleine d&apos;énergie du matin au soir)</p>

              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.energyLevel}
                  onChange={(e) => handleRangeChange('energyLevel', parseInt(e.target.value))}
                  className="w-full accent-black"
                />
                <div className="flex justify-between text-xs text-black/50">
                  <span>1 - Épuisée</span>
                  <span className="font-medium text-black text-lg">{formData.energyLevel}</span>
                  <span>10 - Pleine d&apos;énergie</span>
                </div>
              </div>
            </div>

            {/* Section 5: Sommeil et récupération */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Sommeil et récupération</h3>
              <p className="text-lg text-black/70">Comment décrirais-tu ton sommeil ? (plusieurs réponses possibles)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Je dors bien et me réveille reposée',
                  'Je m\'endors difficilement',
                  'Je me réveille souvent la nuit',
                  'Mon sommeil n\'est pas réparateur',
                  'Je dors moins de 6h par nuit'
                ].map((sleep) => (
                  <label key={sleep} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sleepQuality.includes(sleep)}
                      onChange={() => handleCheckboxGroup('sleepQuality', sleep)}
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{sleep}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 6: Niveau de stress */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Niveau de stress</h3>
              <p className="text-lg text-black/70 mb-3">Comment te sens-tu face au stress ces dernières semaines ?</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'often', label: 'Très souvent tendue' },
                  { value: 'sometimes', label: 'Parfois stressée mais je gère' },
                  { value: 'zen', label: 'Assez zen la plupart du temps' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stressLevel"
                      value={option.value}
                      checked={formData.stressLevel === option.value}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="stressDescription" className="block text-sm mb-2">
                  Décris en quelques mots ce qui te stresse le plus :
                </label>
                <textarea
                  id="stressDescription"
                  name="stressDescription"
                  value={formData.stressDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent border border-black/20 p-3 focus:border-black/60 focus:outline-none transition-colors rounded"
                  placeholder="Par exemple : travail, famille, santé..."
                />
              </div>
            </div>

            {/* Section 7: Habitudes de vie */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Habitudes de vie</h3>
              <p className="text-lg text-black/70">Quelles sont tes habitudes bien-être actuelles ? (plusieurs réponses possibles)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Je pratique une activité physique régulière',
                  'Je médite ou pratique la respiration consciente',
                  'Je surveille mon alimentation',
                  'Je prends des compléments',
                  'Je fais régulièrement des soins ou massages',
                  'Aucune routine bien-être pour le moment'
                ].map((habit) => (
                  <label key={habit} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wellnessHabits.includes(habit)}
                      onChange={() => handleCheckboxGroup('wellnessHabits', habit)}
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{habit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 8: Nutrition & équilibre */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Nutrition & équilibre</h3>
              <p className="text-lg text-black/70">Quel est ton rapport à l&apos;alimentation ? (plusieurs réponses possibles)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Je mange sainement la plupart du temps',
                  'J\'ai souvent des fringales / envies sucrées',
                  'Je saute parfois des repas',
                  'Je fais attention mais je ne perds pas de poids',
                  'Je ne sais pas ce qui me convient vraiment'
                ].map((nutrition) => (
                  <label key={nutrition} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.nutritionRelation.includes(nutrition)}
                      onChange={() => handleCheckboxGroup('nutritionRelation', nutrition)}
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{nutrition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 9: Priorité personnelle */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Priorité personnelle</h3>
              <p className="text-lg text-black/70">Si tu devais choisir une priorité RESET à travailler en premier :</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Corps & silhouette',
                  'Énergie & vitalité',
                  'Sommeil & récupération',
                  'Stress & mental',
                  'Nutrition et métabolisme',
                  'Récupérer mon pouvoir personnel et ma confiance'
                ].map((priority) => (
                  <label key={priority} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="resetPriority"
                      value={priority}
                      checked={formData.resetPriority === priority}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 10: Style de vie & disponibilité */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium border-b border-black/20 pb-2"> Style de vie & disponibilité</h3>
              <p className="text-lg text-black/70">Quelle est ta situation actuelle ? (plusieurs réponses possibles)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Je travaille à temps plein',
                  'Je suis souvent assise / devant un écran',
                  'Je manque de temps pour moi',
                  'Je voyage ou me déplace souvent',
                  'J\'ai des enfants à charge'
                ].map((situation) => (
                  <label key={situation} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.lifestyleSituation.includes(situation)}
                      onChange={() => handleCheckboxGroup('lifestyleSituation', situation)}
                      className="w-4 h-4 accent-black flex-shrink-0"
                    />
                    <span className="text-sm">{situation}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="lifestyleDescription" className="block text-sm mb-2">
                  Décris ton quotidien en 2 phrases :
                </label>
                <textarea
                  id="lifestyleDescription"
                  name="lifestyleDescription"
                  value={formData.lifestyleDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent border border-black/20 p-3 focus:border-black/60 focus:outline-none transition-colors rounded"
                  placeholder="Parle-nous de ta journée type..."
                />
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start gap-3 pt-4 border-t border-black/20">
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 accent-black flex-shrink-0"
              />
              <label htmlFor="gdprConsent" className="text-sm text-black/70">
                J&apos;autorise le RESET Club™ à me contacter par WhatsApp ou email pour réserver ma place pour mon diagnostic personnalisé.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.gdprConsent}
              className="w-full py-4 bg-black text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '📤 Envoi en cours...' : 'ENVOYER MON BILAN GRATUIT RESET CLUB'}
            </button>
          </form>
        </div>
        )}
      </div>
    </div>
  );
}
