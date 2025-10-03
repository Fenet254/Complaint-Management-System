"use client";

import React from "react";

export default function TrackComplaintsPage() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-background-dark flex flex-col border-r border-gray-200 dark:border-gray-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Complaint System
          </h1>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10"
          >
            Dashboard
          </a>
          <a
            href="/submit"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary/10"
          >
            Submit Complaint
          </a>
          <a
            href="/track"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary"
          >
            Track Complaints
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Complaint Tracking
        </h2>
        {/* Table here… */}
      </main>
    </div>
  );
}
