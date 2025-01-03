"use client";

import BackButton from "@/components/backbutton";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from 'react';
import { dummyWords } from "@/lib/dummyWords";
import searchSorted from "@/utils/searchSorted";
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export default function PictureSearchPage() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null);
  const [loadingModel, setLoadingModel] = useState<boolean>(true);

  useEffect(() => {
    tf.setBackend("webgl");

    async function loadModel() {
      setLoadingModel(true); 
      const loadedModel = await use.load();
      setModel(loadedModel);
      setLoadingModel(false);
      console.log("Model loaded!");
    }

    loadModel();
  }, []);

  const handleSearch = async () => {
    if (!searchWord.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setResults([]);

    if (!model) {
      console.error("Model not loaded yet.");
      return;
    }

    const sortedResults = await searchSorted(searchWord, dummyWords, model);
    setResults(sortedResults);
    setLoading(false);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 py-8"
    >
      <BackButton />
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Search</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl h-[500px] overflow-hidden relative">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search for images or topics..."
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            disabled={loading || loadingModel}  // Disable button while loading
            className={`px-6 py-2 text-white font-medium text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 ${loading || loadingModel
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-2"
              }`}
          >
            {loadingModel ? (
              <motion.div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full" />
            ) : loading ? (
              <motion.div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full" />
            ) : (
              "Search"
            )}
          </motion.button>
        </div>

        <div className="space-y-4 relative">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 w-full text-center text-gray-500 font-medium"
            >
              Fetching results...
            </motion.div>
          )}

          <div className={`flex flex-col gap-2 ${loading ? "opacity-0" : "opacity-100"}`}>
            <AnimatePresence>
              {hasSearched && results.length === 0 && !loading ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 font-medium"
                >
                  No results found. Try another search.
                </motion.div>
              ) : (
                results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: idx * 0.14,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    className="bg-gray-200 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-300"
                  >
                    {result}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
