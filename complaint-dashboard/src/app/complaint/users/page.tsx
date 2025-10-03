"use client";

import { useState } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([
    {
      name: "Ethan Carter",
      email: "ethan.carter@email.com",
      role: "Student",
      status: "Active",
    },
    {
      name: "Olivia Bennett",
      email: "olivia.bennett@email.com",
      role: "Staff",
      status: "Active",
    },
    {
      name: "Noah Thompson",
      email: "noah.thompson@email.com",
      role: "Administrator",
      status: "Active",
    },
    {
      name: "Ava Harper",
      email: "ava.harper@email.com",
      role: "Student",
      status: "Inactive",
    },
    {
      name: "Liam Foster",
      email: "liam.foster@email.com",
      role: "Staff",
      status: "Active",
    },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-background-dark flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Complaint System
          </h1>
        </div>
        <nav className="flex-1 px-4 py-2">
          <a
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded hover:bg-primary/10 dark:hover:bg-primary/20"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 px-4 py-2 mt-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded hover:bg-primary/10 dark:hover:bg-primary/20"
            href="#"
          >
            Complaints
          </a>
          <a
            className="flex items-center gap-3 px-4 py-2 mt-1 text-sm font-medium text-white bg-primary rounded-lg"
            href="#"
          >
            Users
          </a>
          <a
            className="flex items-center gap-3 px-4 py-2 mt-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded hover:bg-primary/10 dark:hover:bg-primary/20"
            href="#"
          >
            Analytics
          </a>
          <a
            className="flex items-center gap-3 px-4 py-2 mt-1 text-sm font-medium text-gray-700 dark:text-gray-300 rounded hover:bg-primary/10 dark:hover:bg-primary/20"
            href="#"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and oversee all user accounts within the system.
            </p>
          </header>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                🔍
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-background-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white dark:bg-background-dark rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                User Accounts
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                      Role
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.status === "Active" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-primary hover:text-primary/80"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add User Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Add New User
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
