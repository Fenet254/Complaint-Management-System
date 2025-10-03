"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Complaint Management System
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button className="notification-button relative">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                notifications
              </span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                3
              </span>
            </button>
            {/* Dropdown */}
            <div className="notification-panel absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notifications
                </h4>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <a
                  href="#"
                  className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    New Complaint: #12350
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From: John Doe (Student)
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    2 minutes ago
                  </p>
                </a>
              </div>
            </div>
          </div>

          {/* User Avatar */}
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBb8Bv5TerCiB9-2WKI6fkeTGZSTynPmZyOaAwlq-b-kAd0ZWmZ9R8JhafXUo0NXQChm-mDm6WnKI2t2OAjcJuPvF0Kj8mU3APbg913EfrgEMcUoBI3sdEpqLLwc-n1Ycj_JWawp0cAtImNt9wQXKzZsL3T-sktd1yce_QFIAHuIyv40tkKSUV_ZZIh_OYDc_t2BdxGsygcT_SMQ5TIU354wbRI1QUA-WHzclQaIk7lV1kRooXgzRNGD2lmJ_m2h2rkOeWrUCJWxYY")`,
            }}
          ></div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Overview of complaint trends and resolution rates
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Pending Complaints
              </h3>
              <p className="text-4xl font-bold text-primary mt-2">150</p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Resolved Complaints
              </h3>
              <p className="text-4xl font-bold text-green-500 mt-2">350</p>
            </div>
          </div>

          {/* Chart + Resolution Rate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Complaint Submission Trends
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                +15%
              </p>
              <p className="text-sm text-green-500 font-medium">Last 30 Days</p>
            </div>

            <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Resolution Rates
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                85%
              </p>
              <p className="text-sm text-green-500 font-medium">
                +5% vs last month
              </p>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                All Complaints
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">
                <span className="material-symbols-outlined text-base">add</span>{" "}
                New Complaint
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3">Complaint ID</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Urgency</th>
                    <th className="px-6 py-3">Submitted By</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-background-dark border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      #12345
                    </td>
                    <td className="px-6 py-4">Academic</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4">Student</td>
                    <td className="px-6 py-4">2024-07-26</td>
                  </tr>
                  <tr className="bg-white dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      #12346
                    </td>
                    <td className="px-6 py-4">Facilities</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4">Staff</td>
                    <td className="px-6 py-4">2024-07-25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
