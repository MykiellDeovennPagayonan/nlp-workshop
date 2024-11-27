"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [targetPath, setTargetPath] = useState<string>("");

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTargetPath(path);
  };

  return (
    <motion.main
      className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white px-6"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isExiting && targetPath) {
          router.push(targetPath);
        }
      }}
    >
      <h1 className="text-4xl font-extrabold mb-12 text-center drop-shadow-lg">
        Natural Language Processing Seminar
      </h1>
      <div className="flex flex-col gap-8 items-center max-w-4xl w-full">
        <p className="text-lg text-center font-medium mb-6">
          Explore powerful NLP techniques with interactive demos.
        </p>
        <div className="flex gap-8">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg font-semibold px-8 py-4 rounded-lg shadow-lg bg-white text-gray-800 hover:shadow-2xl hover:bg-gray-100 hover:text-black"
            onClick={() => handleNavigation("/spam-detector")}
          >
            Spam Detector
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg font-semibold px-8 py-4 rounded-lg shadow-lg bg-white text-gray-800 hover:shadow-2xl hover:bg-gray-100 hover:text-black"
            onClick={() => handleNavigation("/sentiment-analysis")}
          >
            Sentiment Analysis
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg font-semibold px-8 py-4 rounded-lg shadow-lg bg-white text-gray-800 hover:shadow-2xl hover:bg-gray-100 hover:text-black"
            onClick={() => handleNavigation("/semantic-search")}
          >
            Semantic Search
          </motion.button>
        </div>
      </div>
    </motion.main>
  );
}
