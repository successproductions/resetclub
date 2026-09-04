export type ModuleThreeQuestion = {
  questionText: string;
  explanation: string;
  options: Array<{
    optionText: string;
    isCorrect: boolean;
  }>;
};

export const MODULE_THREE_CONTENT = {
  moduleTitle: 'PHASE 2 · Module 3 - La Méthode RESET CLUB™ en 6 phases',
  moduleDescription:
    'Comprendre les 6 phases de la méthode RESET CLUB™, leurs objectifs, leurs outils et la progression de la cliente.',
  lessonTitle: 'La Méthode RESET CLUB™ en 6 phases',
  lessonDescription:
    'Accompagner chaque cliente de RESET & DRAIN jusqu’à LONGÉVITÉ & MAINTENANCE en adaptant l’intensité et la durée.',
  quizTitle: 'Quiz - Module 3 : La Méthode RESET CLUB™ en 6 phases',
  quizDescription: 'Valide la compréhension des 6 phases de la méthode RESET CLUB™.',
  questions: [
    {
      questionText:
        'Pourquoi la méthode RESET CLUB™ conserve-t-elle toujours la même structure en 6 phases ?',
      explanation:
        'Chaque cliente suit la même logique de transformation ; seuls l’intensité, la durée et le rythme sont adaptés.',
      options: [
        { optionText: 'Parce que toutes les clientes ont exactement le même objectif', isCorrect: false },
        {
          optionText:
            'Parce que la structure reste la même, tandis que l’intensité, la durée et le rythme s’adaptent à la cliente',
          isCorrect: true,
        },
        { optionText: 'Parce que chaque phase correspond obligatoirement à une seule séance', isCorrect: false },
        { optionText: 'Parce que les machines doivent toujours être utilisées dans le même ordre', isCorrect: false },
      ],
    },
    {
      questionText: 'Quel ensemble correspond à la PHASE 1 — RESET & DRAIN ?',
      explanation:
        'RESET & DRAIN vise à drainer, apaiser, réduire l’inflammation, le cortisol et la rétention d’eau avec Ballancer, LED et Longishape.',
      options: [
        { optionText: 'Tonifier le muscle avec Emsculpt, Exilis et Emtone', isCorrect: false },
        {
          optionText:
            'Drainer et apaiser le corps avec Ballancer, LED et Longishape avant de l’activer',
          isCorrect: true,
        },
        { optionText: 'Reprogrammer le mental avec l’hypnose et le neurofeedback', isCorrect: false },
        { optionText: 'Stabiliser les résultats avec un entretien mensuel', isCorrect: false },
      ],
    },
    {
      questionText: 'Quel est l’objectif de la PHASE 2 — ACTIVATION MÉTABOLIQUE ?',
      explanation:
        'Cette phase réveille le métabolisme, la circulation et l’énergie, puis augmente progressivement la dépense calorique.',
      options: [
        { optionText: 'Faire baisser uniquement la rétention d’eau', isCorrect: false },
        {
          optionText:
            'Réveiller le métabolisme et l’énergie avec Powershape, les ondes de choc et Emsculpt',
          isCorrect: true,
        },
        { optionText: 'Travailler uniquement la qualité de la peau', isCorrect: false },
        { optionText: 'Installer immédiatement un entretien mensuel', isCorrect: false },
      ],
    },
    {
      questionText: 'Que recherche la PHASE 3 — LIPOLYSE & RECOMPOSITION ?',
      explanation:
        'La phase 3 déstocke la graisse localisée, tonifie le muscle et recompose la silhouette avec Emsculpt, Exilis et Emtone.',
      options: [
        { optionText: 'Seulement détendre la cliente', isCorrect: false },
        {
          optionText:
            'Déstocker la graisse localisée, tonifier le muscle et recomposer la silhouette',
          isCorrect: true,
        },
        { optionText: 'Prévenir uniquement l’effet rebond', isCorrect: false },
        { optionText: 'Faire baisser le cortisol avant toute activation', isCorrect: false },
      ],
    },
    {
      questionText: 'Quel est le rôle de la PHASE 4 — RESCULPT & FERMETÉ ?',
      explanation:
        'Cette phase raffermit les tissus, réduit la cellulite et soutient le collagène et la qualité de peau avec Exilis, Emtone et LED.',
      options: [
        { optionText: 'Réveiller le métabolisme avec Powershape', isCorrect: false },
        {
          optionText:
            'Raffermir les tissus, réduire la cellulite et améliorer la qualité de peau',
          isCorrect: true,
        },
        { optionText: 'Traiter les compulsions alimentaires avec l’hypnose', isCorrect: false },
        { optionText: 'Réaliser le premier drainage avec Ballancer', isCorrect: false },
      ],
    },
    {
      questionText: 'Que protège la PHASE 5 — RESET MENTAL & IDENTITÉ ?',
      explanation:
        'La phase 5 agit sur les compulsions, la discipline, les habitudes et les automatismes afin de protéger la transformation.',
      options: [
        { optionText: 'Uniquement le résultat esthétique immédiat', isCorrect: false },
        {
          optionText:
            'La transformation durable en travaillant les compulsions, les habitudes et le mental avec l’hypnose et le neurofeedback',
          isCorrect: true,
        },
        { optionText: 'La dépense calorique avec Emsculpt', isCorrect: false },
        { optionText: 'La qualité de peau avec Exilis et LED', isCorrect: false },
      ],
    },
    {
      questionText: 'Quel est l’objectif de la PHASE 6 — LONGÉVITÉ & MAINTENANCE ?',
      explanation:
        'La phase 6 stabilise les résultats, prévient l’effet rebond et installe un suivi durable avec un entretien mensuel.',
      options: [
        { optionText: 'Créer les premiers changements visibles de silhouette', isCorrect: false },
        {
          optionText:
            'Stabiliser les résultats, prévenir l’effet rebond et maintenir un suivi personnalisé dans le temps',
          isCorrect: true,
        },
        { optionText: 'Réduire l’inflammation avant de commencer', isCorrect: false },
        { optionText: 'Utiliser toutes les machines à chaque rendez-vous', isCorrect: false },
      ],
    },
    {
      questionText: 'Comment se répartit la transformation entre les 6 phases ?',
      explanation:
        'Les phases 1 à 4 transforment le corps, la phase 5 protège la transformation et la phase 6 la fait durer.',
      options: [
        {
          optionText: 'Les phases 1 à 4 transforment le corps, la phase 5 protège et la phase 6 fait durer',
          isCorrect: true,
        },
        { optionText: 'Les phases 1 et 2 suffisent ; les autres sont facultatives', isCorrect: false },
        { optionText: 'Les phases 1 à 5 transforment uniquement le corps', isCorrect: false },
        { optionText: 'La phase 6 remplace toutes les phases précédentes', isCorrect: false },
      ],
    },
    {
      questionText: 'Quel est le rôle global de la thérapeute dans cette méthode ?',
      explanation:
        'La thérapeute identifie où en est la cliente, accompagne sa progression et incarne chaque étape de la méthode.',
      options: [
        { optionText: 'Appuyer sur les boutons des machines et surveiller le temps', isCorrect: false },
        { optionText: 'Choisir une phase différente à chaque séance sans suivi', isCorrect: false },
        {
          optionText:
            'Comprendre où en est la cliente, la guider d’une phase à l’autre et incarner chaque étape',
          isCorrect: true,
        },
        { optionText: 'Vendre uniquement des séances à l’unité', isCorrect: false },
      ],
    },
  ] satisfies ModuleThreeQuestion[],
};
