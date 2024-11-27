"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import BackButton from "@/components/backbutton";

import fetchSentimentAnalysis from "@/utils/fetchSentimentAnalysis";

export default function TextClassificationPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [sentiment, setSentiment] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSentiment(null);

    try {
      const emotion = await fetchSentimentAnalysis(text);
      setSentiment(emotion);
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
      setSentiment("Error analyzing sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 px-4 py-8"
    >
      <BackButton />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Sentiment Analysis</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <label
          htmlFor="text-input"
          className="block text-lg font-medium mb-4 text-gray-600"
        >
          Enter your text below:
        </label>
        <Textarea
          id="text-input"
          className="w-full h-40 resize-none border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 w-full py-3 text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </motion.button>
        
        {sentiment && (
          <div className="mt-6 text-lg font-medium text-gray-800">
            <h2 className="mb-2">Sentiment Result:</h2>
            <p className="text-gray-700">{sentiment}</p>
          </div>
        )}
      </div>
    </motion.main>
  );
}
