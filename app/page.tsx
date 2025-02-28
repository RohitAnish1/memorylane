"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import LandingPage from "@/components/landing-page"
import QuizPage from "@/components/quiz-page"
import ResultsPage from "@/components/results-page"

// Quiz data
const questions = [
  {
    id: 1,
    image: "/images/1.jpg",
    question: "Do you remember this place?",
    choices: [
      "Infant Jesus Church,our first date",
      "thoppil palli",
      "Palarivattam palli",
      "panampilly olla palli",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    image: "/images/2.jpg",
    question: "Who was sitting behind us?",
    choices: ["Our Teacher", "friend", "angel", "my old school vice princy"],
    correctAnswer: 3,
  },
  {
    id: 3,
    image: "/images/3.jpg",
    question: "What did we do for the first time near to the room of this guy?",
    choices: [
      "kiss",
      "make out",
      "hug",
      "or exploree",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    image: "/images/4.jpg",
    question: "What did we order?",
    choices: ["Noodles", "Porota", "sandwich", "ramen"],
    correctAnswer: 3,
  },
  {
    id: 5,
    image: "/images/5.jpg",
    question: "What did i start calling you after this day?",
    choices: [
      "baby",
      "ashyy",
      "monkey",
      "ponnuuu",
    ],
    correctAnswer: 2,
  },
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "quiz" | "results">("landing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const startQuiz = () => {
    setCurrentPage("quiz")
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswers([])
  }

  const handleAnswerSelect = (choiceIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = choiceIndex
    setSelectedAnswers(newSelectedAnswers)

    if (choiceIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setCurrentPage("results")
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentPage("landing")
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswers([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-4">
      {currentPage === "landing" && <LandingPage onStart={startQuiz} />}

      {currentPage === "quiz" && (
        <QuizPage
          question={questions[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        />
      )}

      {currentPage === "results" && <ResultsPage score={score} totalQuestions={questions.length} onReset={resetQuiz} />}

      <motion.div
        className="fixed bottom-4 right-4 text-pink-300 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <Heart size={24} fill="currentColor" />
      </motion.div>
    </main>
  )
}

