"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-float animation-delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Hero Section */}
          <div className="mb-16">
            <motion.h1
              className="text-7xl md:text-9xl font-black text-white mb-6 leading-tight tracking-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Uni</span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Resolve
              </span>
              <span className="block text-5xl md:text-7xl mt-2">AI</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your university experience with AI-powered complaint resolution.
              Voice your concerns, track progress, and drive positive change.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/complaint/role-selection"
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-2xl font-bold rounded-3xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-4xl">🚀</span>
                <span className="relative">Start Your Journey</span>
                <span className="relative text-3xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/track"
                className="px-8 py-4 border-2 border-white/30 text-white text-xl font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Track Complaints
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-white text-4xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Student Voice
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Academic issues, facilities, harassment - we hear every concern with complete anonymity options.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-white text-4xl">👨‍🏫</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Staff Support
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Workplace issues, resources, safety concerns - dedicated channels for university workers.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-white text-4xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI-Powered
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Smart categorization, predictive insights, and automated escalation for faster resolutions.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Complaints Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-400 mb-2">95%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">AI</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Smart Processing</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
