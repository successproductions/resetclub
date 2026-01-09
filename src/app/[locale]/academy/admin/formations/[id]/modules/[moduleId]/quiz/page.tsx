'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';
import Swal from 'sweetalert2';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimitMinutes: number | null;
  maxAttempts: number | null;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  points: number;
  orderIndex: number;
  explanation: string | null;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
}

export default function QuizManagementPage({ params }: { params: Promise<{ id: string; moduleId: string }> }) {
  const router = useRouter();
  const [formationId, setFormationId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  const [quizFormData, setQuizFormData] = useState({
    title: '',
    description: '',
    passingScore: '70',
    timeLimitMinutes: '',
    maxAttempts: ''
  });

  const [questionFormData, setQuestionFormData] = useState({
    questionText: '',
    questionType: 'MULTIPLE_CHOICE' as 'MULTIPLE_CHOICE' | 'TRUE_FALSE',
    points: '1',
    explanation: '',
    options: [
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false }
    ]
  });

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setFormationId(resolvedParams.id);
      setModuleId(resolvedParams.moduleId);
      await fetchModule(resolvedParams.moduleId);
      await fetchQuiz(resolvedParams.moduleId);
    };
    loadData();
  }, [params]);

  const fetchModule = async (moduleId: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/modules/${moduleId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { module } = await response.json();
        setModuleTitle(module.title);
      }
    } catch (error) {
      console.error('Error fetching module:', error);
    }
  };

  const fetchQuiz = async (moduleId: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/modules/${moduleId}/quiz`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const { quiz, questions } = await response.json();
        setQuiz(quiz);
        setQuestions(questions || []);
        if (quiz) {
          setQuizFormData({
            title: quiz.title,
            description: quiz.description || '',
            passingScore: quiz.passingScore.toString(),
            timeLimitMinutes: quiz.timeLimitMinutes?.toString() || '',
            maxAttempts: quiz.maxAttempts?.toString() || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('academy_token');
      const url = quiz
        ? `/api/admin/quizzes/${quiz.id}`
        : `/api/admin/modules/${moduleId}/quiz`;

      const response = await fetch(url, {
        method: quiz ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...quizFormData,
          passingScore: parseInt(quizFormData.passingScore),
          timeLimitMinutes: quizFormData.timeLimitMinutes ? parseInt(quizFormData.timeLimitMinutes) : null,
          maxAttempts: quizFormData.maxAttempts ? parseInt(quizFormData.maxAttempts) : null
        })
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: quiz ? 'Quiz modifié!' : 'Quiz créé!',
          text: quiz ? 'Le quiz a été modifié avec succès' : 'Le quiz a été créé avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        setShowQuizModal(false);
        fetchQuiz(moduleId);
      } else {
        const error = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error || 'Une erreur est survenue',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quiz) {
      await Swal.fire({
        icon: 'warning',
        title: 'Créez d\'abord un quiz',
        text: 'Vous devez créer un quiz avant d\'ajouter des questions',
        confirmButtonColor: '#50b1aa'
      });
      return;
    }

    // Validate at least one correct answer
    const hasCorrectAnswer = questionFormData.options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
      await Swal.fire({
        icon: 'warning',
        title: 'Réponse correcte requise',
        text: 'Vous devez marquer au moins une réponse comme correcte',
        confirmButtonColor: '#50b1aa'
      });
      return;
    }

    try {
      const token = localStorage.getItem('academy_token');
      const url = editingQuestion
        ? `/api/admin/questions/${editingQuestion.id}`
        : `/api/admin/quizzes/${quiz.id}/questions`;

      const response = await fetch(url, {
        method: editingQuestion ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          questionText: questionFormData.questionText,
          questionType: questionFormData.questionType,
          points: parseInt(questionFormData.points),
          explanation: questionFormData.explanation || null,
          options: questionFormData.options.filter(opt => opt.optionText.trim())
        })
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: editingQuestion ? 'Question modifiée!' : 'Question ajoutée!',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        setShowQuestionModal(false);
        setEditingQuestion(null);
        fetchQuiz(moduleId);
        resetQuestionForm();
      } else {
        const error = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error || 'Une erreur est survenue',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette question sera supprimée définitivement',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Supprimée!',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        fetchQuiz(moduleId);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleOpenQuestionModal = (question?: QuizQuestion) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionFormData({
        questionText: question.questionText,
        questionType: question.questionType,
        points: question.points.toString(),
        explanation: question.explanation || '',
        options: question.options.map(opt => ({
          optionText: opt.optionText,
          isCorrect: opt.isCorrect
        }))
      });
    } else {
      resetQuestionForm();
    }
    setShowQuestionModal(true);
  };

  const resetQuestionForm = () => {
    setQuestionFormData({
      questionText: '',
      questionType: 'MULTIPLE_CHOICE',
      points: '1',
      explanation: '',
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false }
      ]
    });
  };

  const addOption = () => {
    setQuestionFormData({
      ...questionFormData,
      options: [...questionFormData.options, { optionText: '', isCorrect: false }]
    });
  };

  const removeOption = (index: number) => {
    const newOptions = questionFormData.options.filter((_, i) => i !== index);
    setQuestionFormData({ ...questionFormData, options: newOptions });
  };

  const updateOption = (index: number, field: 'optionText' | 'isCorrect', value: string | boolean) => {
    const newOptions = [...questionFormData.options];
    if (field === 'isCorrect') {
      // For TRUE_FALSE, only one can be correct
      if (questionFormData.questionType === 'TRUE_FALSE') {
        newOptions.forEach((opt, i) => {
          opt.isCorrect = i === index;
        });
      } else {
        newOptions[index].isCorrect = value as boolean;
      }
    } else {
      newOptions[index].optionText = value as string;
    }
    setQuestionFormData({ ...questionFormData, options: newOptions });
  };

  const handleQuestionTypeChange = (type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE') => {
    if (type === 'TRUE_FALSE') {
      setQuestionFormData({
        ...questionFormData,
        questionType: type,
        options: [
          { optionText: 'Vrai', isCorrect: false },
          { optionText: 'Faux', isCorrect: false }
        ]
      });
    } else {
      setQuestionFormData({
        ...questionFormData,
        questionType: type,
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false }
        ]
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#50b1aa]"></div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/fr/academy/admin/formations/${formationId}/modules`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux modules</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quiz du Module</h1>
        <p className="text-gray-600 mt-1">Module: {moduleTitle}</p>
      </div>

      {/* Quiz Settings */}
      {quiz ? (
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 mb-6 border border-purple-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl! font-bold text-gray-900">{quiz.title}</h2>
              {quiz.description && (
                <p className="text-gray-700 mt-2">{quiz.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowQuizModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors border border-purple-300"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Score de passage</span>
              </div>
              <p className="text-2xl! font-bold text-gray-900">{quiz.passingScore}%</p>
            </div>

            {quiz.timeLimitMinutes && (
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Limite de temps</span>
                </div>
                <p className="text-2xl! font-bold text-gray-900">{quiz.timeLimitMinutes} min</p>
              </div>
            )}

            {quiz.maxAttempts && (
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <span className="font-semibold">Tentatives max</span>
                </div>
                <p className="text-2xl! font-bold text-gray-900">{quiz.maxAttempts}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-purple-50 rounded-lg p-8 text-center mb-6 border-2 border-dashed border-purple-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun quiz créé</h3>
          <p className="text-gray-600 mb-4">Créez un quiz pour ce module</p>
          <button
            onClick={() => setShowQuizModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Créer le quiz
          </button>
        </div>
      )}

      {/* Questions */}
      {quiz && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl! font-bold text-gray-900">
              Questions ({questions.length})
            </h2>
            <button
              onClick={() => handleOpenQuestionModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter une question
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-600 mb-4">Aucune question pour l&apos;instant</p>
              <button
                onClick={() => handleOpenQuestionModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ajouter la première question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-lg font-semibold text-gray-900 mb-1">
                            {question.questionText}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              question.questionType === 'TRUE_FALSE'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {question.questionType === 'TRUE_FALSE' ? 'Vrai/Faux' : 'Choix multiple'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {question.points} point{question.points > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenQuestionModal(question)}
                            className="p-2 text-gray-400 hover:text-[#50b1aa] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={option.id}
                            className={`flex items-center gap-2 p-2 rounded ${
                              option.isCorrect
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option.isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={option.isCorrect ? 'text-green-900 font-medium' : 'text-gray-700'}>
                              {option.optionText}
                            </span>
                          </div>
                        ))}
                      </div>

                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-900">
                            <span className="font-semibold">Explication:</span> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl! font-bold text-gray-900 mb-6">
              {quiz ? 'Modifier le quiz' : 'Créer un quiz'}
            </h2>

            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={quizFormData.title}
                  onChange={(e) => setQuizFormData({ ...quizFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Quiz du module 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={quizFormData.description}
                  onChange={(e) => setQuizFormData({ ...quizFormData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Testez vos connaissances..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score de passage (%) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={quizFormData.passingScore}
                  onChange={(e) => setQuizFormData({ ...quizFormData, passingScore: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Limite de temps (min)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quizFormData.timeLimitMinutes}
                    onChange={(e) => setQuizFormData({ ...quizFormData, timeLimitMinutes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                    placeholder="Optionnel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tentatives max
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quizFormData.maxAttempts}
                    onChange={(e) => setQuizFormData({ ...quizFormData, maxAttempts: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                    placeholder="Illimité"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#50b1aa] text-white py-2 px-4 rounded-lg hover:bg-[#449990] transition-colors font-medium"
                >
                  {quiz ? 'Enregistrer' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl! font-bold text-gray-900 mb-6">
              {editingQuestion ? 'Modifier la question' : 'Nouvelle question'}
            </h2>

            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de question *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuestionTypeChange('MULTIPLE_CHOICE')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      questionFormData.questionType === 'MULTIPLE_CHOICE'
                        ? 'border-[#50b1aa] bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">Choix multiple</p>
                    <p className="text-xs text-gray-600">2-4 options</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuestionTypeChange('TRUE_FALSE')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      questionFormData.questionType === 'TRUE_FALSE'
                        ? 'border-[#50b1aa] bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">Vrai/Faux</p>
                    <p className="text-xs text-gray-600">2 options seulement</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <textarea
                  required
                  value={questionFormData.questionText}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, questionText: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Quelle est la bonne réponse ?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  min="1"
                  value={questionFormData.points}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, points: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options *
                </label>
                <div className="space-y-2">
                  {questionFormData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => updateOption(index, 'isCorrect', e.target.checked)}
                        className="w-5 h-5 text-green-600 rounded"
                        title="Réponse correcte"
                      />
                      <input
                        type="text"
                        required
                        value={option.optionText}
                        onChange={(e) => updateOption(index, 'optionText', e.target.value)}
                        disabled={questionFormData.questionType === 'TRUE_FALSE'}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                        placeholder={`Option ${index + 1}`}
                      />
                      {questionFormData.questionType === 'MULTIPLE_CHOICE' && questionFormData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {questionFormData.questionType === 'MULTIPLE_CHOICE' && questionFormData.options.length < 4 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-2 text-sm text-[#50b1aa] hover:text-[#449990]"
                  >
                    + Ajouter une option
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explication (optionnel)
                </label>
                <textarea
                  value={questionFormData.explanation}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, explanation: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Pourquoi cette réponse est correcte..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#50b1aa] text-white py-2 px-4 rounded-lg hover:bg-[#449990] transition-colors font-medium"
                >
                  {editingQuestion ? 'Enregistrer' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowQuestionModal(false);
                    setEditingQuestion(null);
                    resetQuestionForm();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
