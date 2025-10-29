"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-float animation-delay-1000 opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-pink-400 rounded-full animate-float animation-delay-2000 opacity-60"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-float animation-delay-3000 opacity-60"></div>
        <div className="absolute top-3/4 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-float animation-delay-4000 opacity-60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Path
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Select your role to access specialized complaint categories tailored to your university experience.
            </p>
          </motion.div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <Link
                href="/complaint/student"
                className="block relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <motion.div
                  className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white text-5xl">🎓</span>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-4xl font-black text-white mb-6">
                    Student
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Academic challenges, campus facilities, administrative hurdles, harassment concerns, and technology issues.
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">Academic</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">Facilities</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">Admin</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">Harassment</span>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xl group-hover:text-cyan-300 transition-colors">
                      Start Complaint
                      <motion.span
                        className="text-2xl"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group"
            >
              <Link
                href="/complaint/university-worker"
                className="block relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <motion.div
                  className="relative w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl"
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white text-5xl">👨‍🏫</span>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-4xl font-black text-white mb-6">
                    University Worker
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Workplace challenges, resource allocation, administrative processes, payroll concerns, and safety matters.
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">Workplace</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">Resources</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium">Payroll</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">Safety</span>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-purple-400 font-bold text-xl group-hover:text-purple-300 transition-colors">
                      Start Complaint
                      <motion.span
                        className="text-2xl"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Anonymous Option</h4>
              <p className="text-gray-400 text-sm">Submit complaints with complete privacy protection</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI-Powered</h4>
              <p className="text-gray-400 text-sm">Smart categorization and priority assessment</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Real-time Tracking</h4>
              <p className="text-gray-400 text-sm">Monitor progress and resolution status</p>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              <span className="text-xl">←</span>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
