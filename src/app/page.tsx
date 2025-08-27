"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

interface GenerateResponse {
  result: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    if (input.trim().length > 250) {
      setLoading(false);
      setGeneratedPrompt("Input should't be above 250 characters");
      return;
    }
    setLoading(true);
    setGeneratedPrompt("");
    try {
      const { data } = await axios.post<GenerateResponse>("/api/generate", {
        input,
      });
      setGeneratedPrompt(data.result);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setGeneratedPrompt(
          error.response?.data?.error ||
            "Something went wrong with the request."
        );
      } else if (error instanceof Error) {
        setGeneratedPrompt(error.message);
      } else {
        setGeneratedPrompt("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white overflow-hidden">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000055] to-[#000000dd]" />

      {/* Floating circles for 3D feel */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-[-100px] w-[500px] h-[500px] bg-pink-500 rounded-full blur-3xl opacity-30 animate-ping" />

      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-16 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
            ValidPrompt
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-gray-300">
            Your AI-powered prompt builder for perfect creativity in seconds.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Simply provide a little context, and ValidPrompt will craft a
            detailed, optimized prompt that gets you the best results from AI
            models like GPT-5.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Start Crafting Your Perfect Prompt
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Tell us what you need in a few words, and we’ll generate a
            full-blown, creative, AI-ready prompt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter a topic, idea, or goal..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl bg-black/40 text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={handleGenerate}
              className="cursor-pointer px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              {loading ? "Generating..." : "Generate Prompt"}
            </button>
          </div>
          <div
            className={`text-sm text-right mt-1 ${
              input.length > 250 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {input.length} / 250
          </div>
        </motion.div>

        {/* Prompt Output Section */}
        {generatedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative"
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">
              Your Generated Prompt
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
              {generatedPrompt}
            </p>

            {/* Copy Button */}
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(generatedPrompt)}
              className="cursor-pointer absolute top-6 right-6 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all text-sm font-semibold shadow-md"
            >
              Copy
            </button>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 w-full"
        >
          {[
            {
              title: "AI-Optimized",
              desc: "Every prompt is engineered for maximum clarity and creativity using cutting-edge AI models.",
              icon: "🤖",
            },
            {
              title: "Super Fast",
              desc: "Generate a perfect prompt in seconds. No stress, no guesswork.",
              icon: "⚡",
            },
            {
              title: "For Everyone",
              desc: "Whether you're a marketer, developer, or writer, ValidPrompt works for your needs.",
              icon: "🌎",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-center border border-white/20"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Perfect Prompt?
          </h2>
          <p className="text-gray-400 mb-6">
            Stop wasting time. Let ValidPrompt craft the best AI instructions
            for you.
          </p>
          <button
            type="button"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl transition-all font-bold text-lg"
          >
            Try It Now
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 pb-10 text-center text-gray-500">
        © {new Date().getFullYear()} ValidPrompt. Built for the future of
        creativity.
      </footer>
    </div>
  );
}
