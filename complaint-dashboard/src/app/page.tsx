"use client";

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.h1
              className="text-2xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              UniResolve AI
            </motion.h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              {session && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to UniResolve AI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The most interactive, unique, and AI-powered complaint management system for universities.
            Submit, track, and resolve complaints with cutting-edge technology.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 glass-effect animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered Categorization
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatically categorize complaints using advanced AI algorithms for faster resolution.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 glass-effect animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant notifications and live updates on complaint status changes.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 glass-effect animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gamification
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earn points, unlock badges, and climb leaderboards for active participation.
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 glass-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/complaint/submit"
              className="flex flex-col items-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors animate-pulse-custom"
            >
              <span className="text-3xl mb-2">📝</span>
              <span className="font-medium">Submit Complaint</span>
            </Link>
            <Link
              href="/track"
              className="flex flex-col items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <span className="text-3xl mb-2">🔍</span>
              <span className="font-medium">Track Complaints</span>
            </Link>
            <Link
              href="/admin"
              className="flex flex-col items-center p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <span className="text-3xl mb-2">⚙️</span>
              <span className="font-medium">Admin Dashboard</span>
            </Link>
            <Link
              href="/analytics"
              className="flex flex-col items-center p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <span className="text-3xl mb-2">📊</span>
              <span className="font-medium">Analytics</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center glass-effect">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</div>
            <div className="text-gray-600 dark:text-gray-300">Total Complaints</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center glass-effect">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">89%</div>
            <div className="text-gray-600 dark:text-gray-300">Resolution Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center glass-effect">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">2.3h</div>
            <div className="text-gray-600 dark:text-gray-300">Avg Response Time</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center glass-effect">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4.8/5</div>
            <div className="text-gray-600 dark:text-gray-300">User Satisfaction</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
