"use client";

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';

export default function HomePage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      <ParticleBackground />
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.h1
              className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              UniResolve AI ✨
            </motion.h1>
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 transform shadow-lg"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </motion.button>
              {session && (
                <div className="flex items-center gap-3">
                  <span className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                    Welcome, {session.user.name} 👋
                  </span>
                  <motion.button
                    onClick={() => signOut()}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout 🚪
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to UniResolve AI
          </h2>
          <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
            The most <span className="font-bold text-purple-600">interactive</span>, <span className="font-bold text-pink-600">unique</span>, and <span className="font-bold text-blue-600">AI-powered</span> complaint management system for universities.
            Submit, track, and resolve complaints with cutting-edge technology. 🚀
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-3xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Powered Categorization
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Automatically categorize complaints using advanced AI algorithms for faster resolution. ⚡
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-3xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-Time Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Get instant notifications and live updates on complaint status changes. 📱
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-3xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Gamification
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Earn points, unlock badges, and climb leaderboards for active participation. 🎮
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/30 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-10 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quick Actions ⚡
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/auth/signin"
              className="group flex flex-col items-center p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
            >
              <span className="text-5xl mb-4 group-hover:animate-bounce">📝</span>
              <span className="font-bold text-xl">Submit Complaint</span>
              <span className="text-sm opacity-80 mt-1">Get started now</span>
            </Link>
            <Link
              href="/track"
              className="group flex flex-col items-center p-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
            >
              <span className="text-5xl mb-4 group-hover:animate-bounce">🔍</span>
              <span className="font-bold text-xl">Track Complaints</span>
              <span className="text-sm opacity-80 mt-1">Monitor progress</span>
            </Link>
            <Link
              href="/admin"
              className="group flex flex-col items-center p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
            >
              <span className="text-5xl mb-4 group-hover:animate-bounce">⚙️</span>
              <span className="font-bold text-xl">Admin Dashboard</span>
              <span className="text-sm opacity-80 mt-1">Manage system</span>
            </Link>
            <Link
              href="/analytics"
              className="group flex flex-col items-center p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
            >
              <span className="text-5xl mb-4 group-hover:animate-bounce">📊</span>
              <span className="font-bold text-xl">Analytics</span>
              <span className="text-sm opacity-80 mt-1">View insights</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">1,234</div>
            <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">Total Complaints 📊</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">89%</div>
            <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">Resolution Rate ✅</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">2.3h</div>
            <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">Avg Response Time ⏱️</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">4.8/5</div>
            <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">User Satisfaction 😊</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
