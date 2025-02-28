"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="mx-auto text-pink-400"
      >
        <Heart size={48} fill="currentColor" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-serif text-pink-500 leading-tight">
  A little journey through our memories &hearts;
</h1>


      <p className="text-gray-600 font-light">Let's see how well you remember our special moments together</p>

      <motion.button
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
      >
        Start Quiz
      </motion.button>
    </motion.div>
  )
}

