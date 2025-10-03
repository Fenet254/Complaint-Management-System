// src/app/page.tsx  (if using App Router)
// or pages/index.tsx (if using Pages Router)

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
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-semibold"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Submit Complaint</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <span className="material-symbols-outlined">folder_open</span>
            <span>My Complaints</span>
          </Link>
        </nav>
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/...")`,
              }}
            ></div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Sophia Clark
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Student
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, Sophia. Here&apos;s an overview of your complaints.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-4 mt-4 md:mt-0 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-base">add</span>
            <span>Submit New Complaint</span>
          </button>
        </div>

        {/* Complaints Table */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            My Complaints
          </h3>
          <div className="overflow-x-auto bg-white dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">Complaint ID</th>
                  <th className="px-6 py-3 font-semibold">Subject</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date Submitted</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900/50 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #001
                  </td>
                  <td className="px-6 py-4">Noise complaints in the library</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      In Review
                    </span>
                  </td>
                  <td className="px-6 py-4">2024-01-15</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      className="font-medium text-primary hover:underline"
                      href="#"
                    >
                      View
                    </a>
                  </td>
                </tr>
                {/* Repeat rows... */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
