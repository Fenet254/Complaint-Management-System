"use client";

import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-background-dark flex-col border-r border-gray-200 dark:border-gray-800 hidden lg:flex">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            UniResolve AI
          </h1>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-semibold"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/submit"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Submit Complaint</span>
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <span className="material-symbols-outlined">folder_open</span>
            <span>My Complaints</span>
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Dashboard
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, Sophia. Here&apos;s an overview of your complaints.
        </p>
        {/* Table etc… */}
      </main>
    </div>
  );
}
