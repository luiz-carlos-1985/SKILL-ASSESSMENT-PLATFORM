import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code, Clock, Trophy, Target, CheckCircle, X, Play, BarChart3, Award, Zap, TrendingUp, Palette, DollarSign, Users, HeadphonesIcon, PieChart, UserCheck, Crown, Filter, User, LogOut, Settings, ChevronDown, Download, FileText } from 'lucide-react'
import { getRandomQuestions } from '../data/questions'
import { allAssessments } from '../data/assessments'

interface Question {
  id: string
  type: 'multiple-choice' | 'code' | 'true-false'
  question: string
  code?: string
  options?: string[]
  correctAnswer: string | number | boolean
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

interface Assessment {
  id: string
  title: string
  description: string
  duration: number
  questions: Question[]
  category: string
  level: string
}

export default function SkillAssessmentPlatform() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: any}>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [isPremium, setIsPremium] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{name: string, email: string} | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [trialDays, setTrialDays] = useState(7)
  const [displayedAssessments, setDisplayedAssessments] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [showQuestionConfig, setShowQuestionConfig] = useState(false)
  const [selectedAssessmentForConfig, setSelectedAssessmentForConfig] = useState<Assessment | null>(null)
  const [questionCount, setQuestionCount] = useState(20)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const getFilteredAssessments = () => {
    let filtered = allAssessments
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(assessment => assessment.category === selectedCategory)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(assessment => 
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered.slice(0, displayedAssessments)
  }
  
  const loadMoreAssessments = () => {
    setDisplayedAssessments(prev => prev + 20)
  }
  
  const getUniqueCategories = () => {
    const categories = ['All', ...new Set(allAssessments.map(a => a.category))]
    return categories.slice(0, 20) // Show first 20 categories in filter
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      finishAssessment()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const openQuestionConfig = (assessment: Assessment) => {
    setSelectedAssessmentForConfig(assessment)
    setShowQuestionConfig(true)
  }
  
  const startAssessment = (assessment: Assessment, customQuestionCount?: number) => {
    const getCategoryQuestions = (category: string) => {
      const categoryMap: {[key: string]: string} = {
        'Programming': 'javascript',
        'Computer Science': 'javascript',
        'Information Technology': 'javascript',
        'Software Engineering': 'javascript',
        'Web Development': 'javascript',
        'Mobile Development': 'javascript',
        'Marketing': 'marketing',
        'Digital Marketing': 'marketing',
        'Social Media': 'marketing',
        'Advertising': 'marketing',
        'Public Relations': 'marketing',
        'Design': 'design',
        'Art': 'design',
        'Photography': 'design',
        'Architecture': 'design',
        'Finance': 'finance',
        'Banking': 'finance',
        'Investment': 'finance',
        'Accounting': 'finance',
        'Economics': 'finance',
        'Healthcare': 'healthcare',
        'Medicine': 'healthcare',
        'Nursing': 'healthcare',
        'Dentistry': 'healthcare',
        'Pharmacy': 'healthcare',
        'Education': 'education',
        'Teaching': 'education',
        'Training': 'education',
        'Law': 'law',
        'Legal Studies': 'law',
        'Criminal Justice': 'law',
        'Science': 'science',
        'Physics': 'science',
        'Chemistry': 'science',
        'Biology': 'science',
        'Engineering': 'engineering',
        'Mechanical Engineering': 'engineering',
        'Civil Engineering': 'engineering',
        'Electrical Engineering': 'engineering'
      }
      return categoryMap[category] || 'javascript'
    }
    
    const randomQuestions = getRandomQuestions(getCategoryQuestions(assessment.category), customQuestionCount || questionCount)
    const assessmentWithQuestions = { ...assessment, questions: randomQuestions }
    
    setSelectedAssessment(assessmentWithQuestions)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTimeLeft(assessment.duration * 60)
    setIsActive(true)
    setShowResults(false)
    setScore(0)
  }

  const answerQuestion = (answer: any) => {
    if (!selectedAssessment) return
    
    const currentQuestion = selectedAssessment.questions[currentQuestionIndex]
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))
  }

  const nextQuestion = () => {
    if (!selectedAssessment) return
    
    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      finishAssessment()
    }
  }

  const finishAssessment = () => {
    if (!selectedAssessment) return
    
    setIsActive(false)
    
    let totalScore = 0
    selectedAssessment.questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (userAnswer === question.correctAnswer) {
        totalScore += question.points
      }
    })
    
    setScore(totalScore)
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return 'Excellent'
    if (percentage >= 60) return 'Good'
    if (percentage >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div className="text-center flex-1">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-10 h-10 text-blue-400 mr-3" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Skill Assessment
              </h1>
            </div>
            <p className="text-xl text-gray-300">Evaluate and improve your technical skills</p>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-400">{isPremium ? 'Premium' : `Trial: ${trialDays} days`}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="p-2 glass-blue rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-300" />
                  </button>
                  <button 
                    onClick={() => {setIsLoggedIn(false); setUser(null); setIsPremium(false)}}
                    className="p-2 glass-blue rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Premium Banner */}
        {isLoggedIn && !isPremium && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-blue rounded-2xl p-4 mb-6 text-center border-yellow-400/30"
          >
            <div className="flex items-center justify-center mb-2">
              <Crown className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold">Upgrade to Premium</span>
            </div>
            <p className="text-gray-300 text-sm mb-3">Unlock unlimited assessments, detailed analytics, and certificates</p>
            <div className="flex space-x-3 justify-center">
              <button 
                onClick={() => {setIsPremium(true); setTrialDays(14)}}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => setIsPremium(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
              >
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}
        
        {!isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-blue rounded-2xl p-6 mb-6 text-center border-blue-400/30"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Join Skill Assessment Platform</h3>
            <p className="text-gray-300 mb-4">Create an account to track your progress, earn certificates, and access premium features</p>
            <div className="flex space-x-3 justify-center">
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Sign Up Free
              </button>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-blue rounded-2xl p-4 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">{allAssessments.length}+</h3>
            <p className="text-gray-400 text-sm">Assessments</p>
          </div>
          <div className="glass-blue rounded-2xl p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">25K+</h3>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>
          <div className="glass-blue rounded-2xl p-4 text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
          <div className="glass-blue rounded-2xl p-4 text-center">
            <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">4.8/5</h3>
            <p className="text-gray-400 text-sm">Rating</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedAssessment ? (
            <>
              {/* Search and Filter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 space-y-4"
              >
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search assessments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {getUniqueCategories().map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Assessment Selection */}
              <motion.div
                key="selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
              {getFilteredAssessments().map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="question-card cursor-pointer"
                  onClick={() => openQuestionConfig(assessment)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-blue-400">
                      {assessment.category.includes('Programming') || assessment.category.includes('Computer') || assessment.category.includes('Software') || assessment.category.includes('Web') || assessment.category.includes('Mobile') ? <Code className="w-8 h-8" /> : 
                       assessment.category.includes('Marketing') || assessment.category.includes('Social') || assessment.category.includes('Advertising') ? <TrendingUp className="w-8 h-8" /> :
                       assessment.category.includes('Design') || assessment.category.includes('Art') || assessment.category.includes('Photography') ? <Palette className="w-8 h-8" /> :
                       assessment.category.includes('Finance') || assessment.category.includes('Banking') || assessment.category.includes('Investment') || assessment.category.includes('Accounting') || assessment.category.includes('Economics') ? <DollarSign className="w-8 h-8" /> :
                       assessment.category.includes('Business') || assessment.category.includes('Management') ? <Target className="w-8 h-8" /> :
                       assessment.category.includes('Sales') ? <Trophy className="w-8 h-8" /> :
                       assessment.category.includes('Customer') || assessment.category.includes('Support') ? <HeadphonesIcon className="w-8 h-8" /> :
                       assessment.category.includes('Analytics') || assessment.category.includes('Data') || assessment.category.includes('Statistics') ? <PieChart className="w-8 h-8" /> :
                       assessment.category.includes('Human') || assessment.category.includes('HR') ? <UserCheck className="w-8 h-8" /> :
                       assessment.category.includes('Health') || assessment.category.includes('Medicine') || assessment.category.includes('Nursing') ? <HeadphonesIcon className="w-8 h-8" /> :
                       assessment.category.includes('Education') || assessment.category.includes('Teaching') ? <Users className="w-8 h-8" /> :
                       assessment.category.includes('Law') || assessment.category.includes('Legal') || assessment.category.includes('Justice') ? <Target className="w-8 h-8" /> :
                       assessment.category.includes('Science') || assessment.category.includes('Physics') || assessment.category.includes('Chemistry') || assessment.category.includes('Biology') ? <Zap className="w-8 h-8" /> :
                       assessment.category.includes('Engineering') ? <Code className="w-8 h-8" /> :
                       <BarChart3 className="w-8 h-8" />}
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        assessment.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        assessment.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {assessment.level}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{assessment.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{assessment.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {assessment.duration} min
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      Customizable questions
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full mt-4 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      !isPremium && assessment.level === 'Advanced' 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                    }`}
                    disabled={!isLoggedIn || (!isPremium && assessment.level === 'Advanced')}
                  >
                    {!isLoggedIn ? (
                      <>
                        <User className="w-5 h-5 mr-2" />
                        Login Required
                      </>
                    ) : !isPremium && assessment.level === 'Advanced' ? (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Premium Only
                      </>
                    ) : (
                      <>
                        <Settings className="w-5 h-5 mr-2" />
                        Configure & Start
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ))}
              </motion.div>
              
              {/* Load More Button */}
              {getFilteredAssessments().length < (selectedCategory === 'All' ? allAssessments : allAssessments.filter(a => a.category === selectedCategory)).length && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={loadMoreAssessments}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center mx-auto"
                  >
                    <span>Load More Assessments</span>
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              )}
            </>
          ) : showResults ? (
            /* Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-blue rounded-3xl p-8 text-center max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-32 h-32 mx-auto mb-6 relative"
              >
                <svg className="w-full h-full progress-ring">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    className="text-blue-400"
                    initial={{ strokeDasharray: "0 351.86" }}
                    animate={{ 
                      strokeDasharray: `${(score / selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 351.86} 351.86`
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(score, selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0))}`}>
                      {Math.round((score / selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 100)}%
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
              <p className={`text-xl font-semibold mb-2 ${getScoreColor(score, selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0))}`}>
                {getScoreLabel(score, selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0))}
              </p>
              
              {isPremium && (
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-medium">Certificate Available</span>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/20 rounded-xl p-4">
                  <h3 className="text-2xl font-bold text-blue-400">{score}</h3>
                  <p className="text-gray-400 text-sm">Points Earned</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                  <h3 className="text-2xl font-bold text-green-400">
                    {selectedAssessment.questions.filter(q => answers[q.id] === q.correctAnswer).length}
                  </h3>
                  <p className="text-gray-400 text-sm">Correct Answers</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4">
                  <h3 className="text-2xl font-bold text-purple-400">
                    {Math.round(((selectedAssessment.duration * 60 - timeLeft) / 60) * 10) / 10}
                  </h3>
                  <p className="text-gray-400 text-sm">Minutes Used</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAssessment(null)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Take Another Assessment
                </motion.button>
                {isPremium ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const canvas = document.createElement('canvas')
                        const ctx = canvas.getContext('2d')
                        canvas.width = 1200
                        canvas.height = 800
                        
                        // Background
                        ctx!.fillStyle = '#ffffff'
                        ctx!.fillRect(0, 0, 1200, 800)
                        
                        // Decorative border
                        ctx!.strokeStyle = '#3b82f6'
                        ctx!.lineWidth = 8
                        ctx!.strokeRect(40, 40, 1120, 720)
                        
                        // Inner border
                        ctx!.strokeStyle = '#6366f1'
                        ctx!.lineWidth = 2
                        ctx!.strokeRect(60, 60, 1080, 680)
                        
                        // Header decoration
                        const headerGradient = ctx!.createLinearGradient(0, 80, 1200, 180)
                        headerGradient.addColorStop(0, '#3b82f6')
                        headerGradient.addColorStop(0.5, '#6366f1')
                        headerGradient.addColorStop(1, '#8b5cf6')
                        ctx!.fillStyle = headerGradient
                        ctx!.fillRect(80, 80, 1040, 100)
                        
                        // Certificate title
                        ctx!.fillStyle = '#ffffff'
                        ctx!.font = 'bold 48px serif'
                        ctx!.textAlign = 'center'
                        ctx!.fillText('CERTIFICATE', 600, 140)
                        
                        ctx!.font = 'bold 32px serif'
                        ctx!.fillText('OF ACHIEVEMENT', 600, 170)
                        
                        // Main content
                        ctx!.fillStyle = '#1f2937'
                        ctx!.font = '28px serif'
                        ctx!.fillText('This is to certify that', 600, 260)
                        
                        // User name with underline
                        ctx!.font = 'bold 42px serif'
                        ctx!.fillStyle = '#3b82f6'
                        const userName = user?.name || 'User'
                        ctx!.fillText(userName, 600, 320)
                        
                        // Underline for name
                        const nameWidth = ctx!.measureText(userName).width
                        ctx!.strokeStyle = '#3b82f6'
                        ctx!.lineWidth = 3
                        ctx!.beginPath()
                        ctx!.moveTo(600 - nameWidth/2, 335)
                        ctx!.lineTo(600 + nameWidth/2, 335)
                        ctx!.stroke()
                        
                        // Achievement text
                        ctx!.fillStyle = '#1f2937'
                        ctx!.font = '24px serif'
                        ctx!.fillText('has successfully completed the assessment', 600, 380)
                        
                        // Assessment title
                        ctx!.font = 'bold 36px serif'
                        ctx!.fillStyle = '#6366f1'
                        ctx!.fillText(selectedAssessment.title, 600, 430)
                        
                        // Score section
                        const percentage = Math.round((score / selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 100)
                        ctx!.fillStyle = '#059669'
                        ctx!.font = 'bold 28px serif'
                        ctx!.fillText(`Score: ${percentage}%`, 600, 490)
                        
                        // Date and signature area
                        ctx!.fillStyle = '#6b7280'
                        ctx!.font = '20px serif'
                        ctx!.textAlign = 'left'
                        ctx!.fillText(`Date: ${new Date().toLocaleDateString()}`, 150, 650)
                        
                        ctx!.textAlign = 'right'
                        ctx!.fillText('Skill Assessment Platform', 1050, 650)
                        
                        // Signature lines
                        ctx!.strokeStyle = '#9ca3af'
                        ctx!.lineWidth = 1
                        ctx!.beginPath()
                        ctx!.moveTo(150, 680)
                        ctx!.lineTo(350, 680)
                        ctx!.stroke()
                        
                        ctx!.beginPath()
                        ctx!.moveTo(850, 680)
                        ctx!.lineTo(1050, 680)
                        ctx!.stroke()
                        
                        ctx!.fillStyle = '#9ca3af'
                        ctx!.font = '16px serif'
                        ctx!.textAlign = 'center'
                        ctx!.fillText('Date', 250, 700)
                        ctx!.fillText('Authorized Signature', 950, 700)
                        
                        // Decorative elements
                        ctx!.fillStyle = '#fbbf24'
                        ctx!.beginPath()
                        ctx!.arc(150, 250, 30, 0, 2 * Math.PI)
                        ctx!.fill()
                        
                        ctx!.beginPath()
                        ctx!.arc(1050, 250, 30, 0, 2 * Math.PI)
                        ctx!.fill()
                        
                        // Star in circles
                        ctx!.fillStyle = '#ffffff'
                        ctx!.font = 'bold 24px serif'
                        ctx!.textAlign = 'center'
                        ctx!.fillText('★', 150, 260)
                        ctx!.fillText('★', 1050, 260)
                        
                        // Download
                        const link = document.createElement('a')
                        link.download = `${selectedAssessment.title.replace(/\s+/g, '_')}_Certificate.png`
                        link.href = canvas.toDataURL('image/png', 1.0)
                        link.click()
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Certificate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAnalytics(true)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Detailed Analytics
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Premium Features Locked
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            /* Question Interface */
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Progress Header */}
              <div className="glass-blue rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedAssessment.title}</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-yellow-400">
                      <Clock className="w-5 h-5 mr-2" />
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-gray-400">
                      {currentQuestionIndex + 1} / {selectedAssessment.questions.length}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              {/* Question */}
              <div className="question-card">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">
                      Question {currentQuestionIndex + 1}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedAssessment.questions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                      selectedAssessment.questions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedAssessment.questions[currentQuestionIndex].difficulty}
                    </div>
                  </div>
                  
                  <p className="text-lg mb-4">{selectedAssessment.questions[currentQuestionIndex].question}</p>
                  
                  {selectedAssessment.questions[currentQuestionIndex].code && (
                    <div className="code-editor mb-4">
                      <pre>{selectedAssessment.questions[currentQuestionIndex].code}</pre>
                    </div>
                  )}
                </div>
                
                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {selectedAssessment.questions[currentQuestionIndex].type === 'multiple-choice' && (
                    selectedAssessment.questions[currentQuestionIndex].options?.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => answerQuestion(index)}
                        className={`option-button ${
                          answers[selectedAssessment.questions[currentQuestionIndex].id] === index ? 'option-selected' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center">
                            {answers[selectedAssessment.questions[currentQuestionIndex].id] === index && (
                              <div className="w-3 h-3 rounded-full bg-blue-400" />
                            )}
                          </div>
                          {option}
                        </div>
                      </motion.button>
                    ))
                  )}
                  
                  {selectedAssessment.questions[currentQuestionIndex].type === 'true-false' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => answerQuestion(true)}
                        className={`option-button ${
                          answers[selectedAssessment.questions[currentQuestionIndex].id] === true ? 'option-selected' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                          True
                        </div>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => answerQuestion(false)}
                        className={`option-button ${
                          answers[selectedAssessment.questions[currentQuestionIndex].id] === false ? 'option-selected' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <X className="w-6 h-6 text-red-400 mr-3" />
                          False
                        </div>
                      </motion.button>
                    </>
                  )}
                  
                  {selectedAssessment.questions[currentQuestionIndex].type === 'code' && (
                    <textarea
                      className="w-full h-32 code-editor resize-none"
                      placeholder="Write your code here..."
                      value={answers[selectedAssessment.questions[currentQuestionIndex].id] || ''}
                      onChange={(e) => answerQuestion(e.target.value)}
                    />
                  )}
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAssessment(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Exit Assessment
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    disabled={!answers[selectedAssessment.questions[currentQuestionIndex].id]}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    {currentQuestionIndex === selectedAssessment.questions.length - 1 ? 'Finish' : 'Next Question'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Login Modal */}
        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowLogin(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-blue rounded-2xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button 
                      onClick={() => {
                        setIsLoggedIn(true)
                        setUser({name: 'John Doe', email: 'john@example.com'})
                        setShowLogin(false)
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setShowLogin(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <div className="text-center pt-4">
                    <p className="text-gray-400 text-sm">Don't have an account?</p>
                    <button 
                      onClick={() => {
                        setIsLoggedIn(true)
                        setUser({name: 'New User', email: 'user@example.com'})
                        setIsPremium(true)
                        setTrialDays(14)
                        setShowLogin(false)
                      }}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Sign up with 14-day free trial
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-blue rounded-2xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                        <input 
                          type="text" 
                          value={user?.name || ''}
                          onChange={(e) => setUser(prev => prev ? {...prev, name: e.target.value} : null)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          value={user?.email || ''}
                          onChange={(e) => setUser(prev => prev ? {...prev, email: e.target.value} : null)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Subscription Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Subscription</h3>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Plan:</span>
                        <span className={`font-semibold ${isPremium ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {isPremium ? 'Premium' : 'Free'}
                        </span>
                      </div>
                      {isPremium && !trialDays && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Trial Days:</span>
                          <span className="text-blue-400 font-semibold">{trialDays} days left</span>
                        </div>
                      )}
                      {!isPremium && (
                        <button 
                          onClick={() => {setIsPremium(true); setTrialDays(14)}}
                          className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                        >
                          Start Free Trial
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Preferences Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Email Notifications</span>
                        <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Question Configuration Modal */}
        <AnimatePresence>
          {showQuestionConfig && selectedAssessmentForConfig && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowQuestionConfig(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-blue rounded-2xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Configure Assessment</h2>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">{selectedAssessmentForConfig.title}</h3>
                    <p className="text-gray-400 text-sm">{selectedAssessmentForConfig.description}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-3">Number of Questions</label>
                    <div className="space-y-3">
                      <input 
                        type="number" 
                        min="1"
                        max="500"
                        value={questionCount}
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (value >= 1 && value <= 500) {
                            setQuestionCount(value)
                          }
                        }}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-xl font-bold focus:border-blue-400 focus:outline-none"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Min: 1</span>
                        <span>Max: 500</span>
                      </div>
                      
                      {/* Quick Select Buttons */}
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {[10, 20, 50, 100].map(count => (
                          <button
                            key={count}
                            onClick={() => setQuestionCount(count)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              questionCount === count 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Estimated Time:</span>
                      <span className="text-blue-400 font-semibold">{Math.ceil(questionCount * 1.5)} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Difficulty:</span>
                      <span className={`font-semibold ${
                        selectedAssessmentForConfig.level === 'Beginner' ? 'text-green-400' :
                        selectedAssessmentForConfig.level === 'Intermediate' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {selectedAssessmentForConfig.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button 
                      onClick={() => {
                        startAssessment(selectedAssessmentForConfig, questionCount)
                        setShowQuestionConfig(false)
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Assessment
                    </button>
                    <button 
                      onClick={() => setShowQuestionConfig(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Analytics Modal */}
        <AnimatePresence>
          {showAnalytics && selectedAssessment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowAnalytics(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-blue rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Detailed Analytics</h2>
                  <button 
                    onClick={() => setShowAnalytics(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{Math.round((score / selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 100)}%</div>
                      <div className="text-gray-400 text-sm">Overall Score</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{selectedAssessment.questions.filter(q => answers[q.id] === q.correctAnswer).length}</div>
                      <div className="text-gray-400 text-sm">Correct Answers</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-red-400">{selectedAssessment.questions.length - selectedAssessment.questions.filter(q => answers[q.id] === q.correctAnswer).length}</div>
                      <div className="text-gray-400 text-sm">Incorrect Answers</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{Math.round(((selectedAssessment.duration * 60 - timeLeft) / 60) * 10) / 10}</div>
                      <div className="text-gray-400 text-sm">Minutes Used</div>
                    </div>
                  </div>
                  
                  {/* Performance by Difficulty */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance by Difficulty</h3>
                    <div className="space-y-3">
                      {['easy', 'medium', 'hard'].map(difficulty => {
                        const difficultyQuestions = selectedAssessment.questions.filter(q => q.difficulty === difficulty)
                        const correctCount = difficultyQuestions.filter(q => answers[q.id] === q.correctAnswer).length
                        const percentage = difficultyQuestions.length > 0 ? (correctCount / difficultyQuestions.length) * 100 : 0
                        
                        return (
                          <div key={difficulty} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${
                                difficulty === 'easy' ? 'bg-green-400' :
                                difficulty === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-white capitalize">{difficulty}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-400">{correctCount}/{difficultyQuestions.length}</span>
                              <div className="w-24 bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-full rounded-full ${
                                    difficulty === 'easy' ? 'bg-green-400' :
                                    difficulty === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white font-semibold w-12">{Math.round(percentage)}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Question Breakdown */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Question Breakdown</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedAssessment.questions.map((question, index) => {
                        const isCorrect = answers[question.id] === question.correctAnswer
                        return (
                          <div key={question.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                isCorrect ? 'bg-green-500' : 'bg-red-500'
                              }`}>
                                {isCorrect ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </div>
                              <span className="text-white">Question {index + 1}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`px-2 py-1 rounded text-xs ${
                                question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {question.difficulty}
                              </span>
                              <span className="text-gray-400">{question.points} pts</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI-Powered Recommendations</h3>
                    <div className="space-y-3">
                      {(() => {
                        const percentage = (score / selectedAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 100
                        const correctAnswers = selectedAssessment.questions.filter(q => answers[q.id] === q.correctAnswer).length
                        const totalQuestions = selectedAssessment.questions.length
                        const timeUsed = (selectedAssessment.duration * 60 - timeLeft) / 60
                        const avgTimePerQuestion = timeUsed / totalQuestions
                        
                        // Analyze performance by difficulty
                        const easyQuestions = selectedAssessment.questions.filter(q => q.difficulty === 'easy')
                        const mediumQuestions = selectedAssessment.questions.filter(q => q.difficulty === 'medium')
                        const hardQuestions = selectedAssessment.questions.filter(q => q.difficulty === 'hard')
                        
                        const easyCorrect = easyQuestions.filter(q => answers[q.id] === q.correctAnswer).length
                        const mediumCorrect = mediumQuestions.filter(q => answers[q.id] === q.correctAnswer).length
                        const hardCorrect = hardQuestions.filter(q => answers[q.id] === q.correctAnswer).length
                        
                        const easyPercentage = easyQuestions.length > 0 ? (easyCorrect / easyQuestions.length) * 100 : 0
                        const mediumPercentage = mediumQuestions.length > 0 ? (mediumCorrect / mediumQuestions.length) * 100 : 0
                        const hardPercentage = hardQuestions.length > 0 ? (hardCorrect / hardQuestions.length) * 100 : 0
                        
                        const recommendations = []
                        
                        // Overall performance analysis
                        if (percentage >= 95) {
                          recommendations.push("🎆 Outstanding mastery! You're ready for expert-level challenges in ${selectedAssessment.category}. Consider mentoring others or pursuing advanced certifications.")
                        } else if (percentage >= 85) {
                          recommendations.push("🎉 Excellent performance! You have strong competency in ${selectedAssessment.category}. Focus on specialized advanced topics to reach expert level.")
                        } else if (percentage >= 75) {
                          recommendations.push("👍 Solid understanding demonstrated. Review missed concepts and practice similar assessments to achieve mastery in ${selectedAssessment.category}.")
                        } else if (percentage >= 60) {
                          recommendations.push("📚 Good foundation, but improvement needed. Focus on strengthening core concepts in ${selectedAssessment.category} before advancing.")
                        } else if (percentage >= 40) {
                          recommendations.push("🎯 Significant gaps identified. Recommend structured learning path with fundamentals course in ${selectedAssessment.category}.")
                        } else {
                          recommendations.push("📚 Critical knowledge gaps detected. Start with beginner-level resources and consider guided learning in ${selectedAssessment.category}.")
                        }
                        
                        // Difficulty-specific analysis
                        if (easyPercentage < 80 && easyQuestions.length > 0) {
                          recommendations.push("⚠️ Fundamental concepts need attention. Focus on basic ${selectedAssessment.category} principles before advancing to complex topics.")
                        }
                        
                        if (mediumPercentage < 60 && mediumQuestions.length > 0 && easyPercentage >= 70) {
                          recommendations.push("🔄 Strong basics but struggling with intermediate concepts. Practice applied scenarios and real-world examples in ${selectedAssessment.category}.")
                        }
                        
                        if (hardPercentage < 40 && hardQuestions.length > 0 && mediumPercentage >= 60) {
                          recommendations.push("💡 Advanced topics challenging you. Seek expert-level resources, case studies, and hands-on projects in ${selectedAssessment.category}.")
                        }
                        
                        // Time management analysis
                        if (avgTimePerQuestion < 0.5) {
                          recommendations.push("⏱️ Very fast completion detected. Consider spending more time analyzing questions to improve accuracy.")
                        } else if (avgTimePerQuestion > 2.5) {
                          recommendations.push("🕰️ Time management opportunity. Practice timed exercises to improve decision-making speed in ${selectedAssessment.category}.")
                        }
                        
                        // Category-specific recommendations
                        const categoryAdvice = {
                          'Programming': percentage < 70 ? 'Practice coding challenges daily and build projects to reinforce concepts.' : 'Explore advanced algorithms and contribute to open-source projects.',
                          'Marketing': percentage < 70 ? 'Study consumer behavior and practice campaign analysis.' : 'Focus on emerging trends like AI marketing and data-driven strategies.',
                          'Design': percentage < 70 ? 'Practice design principles and study user psychology.' : 'Explore advanced prototyping tools and design systems.',
                          'Finance': percentage < 70 ? 'Strengthen mathematical foundations and study market fundamentals.' : 'Dive into advanced financial modeling and risk management.',
                          'Healthcare': percentage < 70 ? 'Review anatomy, physiology, and medical terminology.' : 'Stay updated with latest medical research and evidence-based practices.',
                          'Education': percentage < 70 ? 'Study learning theories and classroom management techniques.' : 'Explore educational technology and personalized learning approaches.',
                          'Law': percentage < 70 ? 'Focus on legal reasoning and case study analysis.' : 'Specialize in emerging areas like cyber law and international regulations.',
                          'Science': percentage < 70 ? 'Strengthen scientific method and experimental design knowledge.' : 'Explore interdisciplinary research and cutting-edge developments.',
                          'Engineering': percentage < 70 ? 'Practice problem-solving and strengthen mathematical foundations.' : 'Focus on innovation, sustainability, and emerging technologies.'
                        }
                        
                        const categoryRec = categoryAdvice[selectedAssessment.category] || 'Continue learning and practicing in your field.'
                        recommendations.push(`🎯 ${categoryRec}`)
                        
                        // Next steps recommendation
                        if (percentage >= 80) {
                          recommendations.push("🚀 Ready for next level! Consider taking assessments in related fields or advanced ${selectedAssessment.category} specializations.")
                        } else {
                          recommendations.push("📝 Retake recommendation: Study identified weak areas for 2-3 weeks, then retake this assessment to track improvement.")
                        }
                        
                        return recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{rec.replace('${selectedAssessment.category}', selectedAssessment.category)}</span>
                          </div>
                        ))
                      })()
                      }
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setShowAnalytics(false)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Close Analytics
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}