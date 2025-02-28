"use client"

import { motion } from "framer-motion"
import { Heart, Award, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface ResultsPageProps {
  score: number
  totalQuestions: number
  onReset: () => void
}

export default function ResultsPage({ score, totalQuestions, onReset }: ResultsPageProps) {
  const percentage = (score / totalQuestions) * 100

  let message = ""
  let icon = null

  if (percentage === 100) {
    message = "You remember everything! Just like I remember how much I love you ❤️"
    icon = <Sparkles className="text-yellow-400" size={28} />
  } else if (percentage >= 60) {
    message = "Some memories fade, but love stays forever 😊"
    icon = <Heart className="text-pink-400" size={28} />
  } else {
    message = "Looks like we need another date! 💕"
    icon = <Award className="text-blue-400" size={28} />
  }

  useEffect(() => {
    if (percentage === 100) {
      // Trigger confetti for perfect score
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff9ff3", "#ffeaa7", "#74b9ff"],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ff9ff3", "#ffeaa7", "#74b9ff"],
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [percentage])

  return (
    <motion.div
      className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center">{icon}</div>

      <h1 className="text-3xl font-serif text-pink-500 leading-tight">
        Your Score: {score}/{totalQuestions}
      </h1>

      <div className="w-full bg-pink-100 rounded-full h-4">
        <motion.div
          className="bg-pink-400 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </div>

      <p className="text-gray-700 font-light text-lg">{message}</p>

      <motion.button
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
      >
        Play Again
      </motion.button>

      <div className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-sm text-gray-500 italic"
        >
          "Love is not about how many days, months, or years you have been together. Love is about how much you love
          each other every single day."
        </motion.div>
      </div>
    </motion.div>
  )
}

