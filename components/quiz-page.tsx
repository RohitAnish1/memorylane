"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Question {
  id: number
  image: string
  question: string
  choices: string[]
  correctAnswer: number
}

interface QuizPageProps {
  question: Question
  onAnswerSelect: (choiceIndex: number) => void
  currentQuestionIndex: number
  totalQuestions: number
  selectedAnswer: number | undefined
}

export default function QuizPage({
  question,
  onAnswerSelect,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
}: QuizPageProps) {
  // Ensure showSparkles is used correctly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSparkles, setShowSparkles] = useState<number | null>(null)

  useEffect(() => {
    setShowSparkles(null)
  }, [question])

  const handleChoiceClick = (index: number) => {
    if (selectedAnswer !== undefined) return // Prevent multiple selections

    setShowSparkles(index)
    onAnswerSelect(index)
  }

  const isCorrect = (index: number) => {
    return selectedAnswer === index && index === question.correctAnswer
  }

  const isWrong = (index: number) => {
    return selectedAnswer === index && index !== question.correctAnswer
  }

  return (
    <motion.div
      className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={question.image || "/placeholder.svg"}
          alt="Romantic memory"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-pink-500 mb-2">{question.question}</h2>
          <p className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>

        <div className="grid gap-4">
          {question.choices.map((choice, index) => (
            <motion.button
              key={index}
              className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                isCorrect(index)
                  ? "border-green-300 bg-green-50"
                  : isWrong(index)
                    ? "border-red-300 bg-red-50"
                    : "border-pink-100 hover:border-pink-300 bg-white"
              }`}
              whileHover={{ scale: selectedAnswer === undefined ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer === undefined ? 0.98 : 1 }}
              onClick={() => handleChoiceClick(index)}
              disabled={selectedAnswer !== undefined}
            >
              {choice}

              {/* Sparkles animation for correct answer */}
              {showSparkles !== null && isCorrect(showSparkles) && (
                <AnimatePresence>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        opacity: 1,
                        scale: 0,
                        x: "50%",
                        y: "50%",
                      }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: `${Math.random() * 200 - 100}%`,
                        y: `${Math.random() * 200 - 100}%`,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <Heart size={16} className="text-pink-400" fill="currentColor" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-pink-100 rounded-full h-2.5">
          <div
            className="bg-pink-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  )
}
