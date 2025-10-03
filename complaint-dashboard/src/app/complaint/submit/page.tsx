"use client";

import { useState } from "react";

export default function SubmitComplaintPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic Issues",
    urgency: "Low",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Complaint submitted ✅ (check console for details)");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-background-dark/50 border-b border-gray-200 dark:border-gray-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                fill="currentColor"
              />
            </svg>
            <nav className="hidden md:block ml-10 space-x-4">
              <a
                className="px-3 py-2 rounded-lg text-sm font-medium hover:text-primary"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="px-3 py-2 rounded-lg text-sm font-medium bg-primary text-white"
                href="#"
              >
                Complaints
              </a>
              <a
                className="px-3 py-2 rounded-lg text-sm font-medium hover:text-primary"
                href="#"
              >
                FAQ
              </a>
              <a
                className="px-3 py-2 rounded-lg text-sm font-medium hover:text-primary"
                href="#"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Submit a Complaint
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to submit your complaint. Our AI will help
            categorize it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Issue with course registration"
                value={form.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark/50 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Please provide as much detail as possible..."
                value={form.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark/50 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            {/* Category + Urgency */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark/50 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option>Academic Issues</option>
                  <option>Administrative Services</option>
                  <option>Facilities & Maintenance</option>
                  <option>Student Life</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium">
                  Urgency
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={form.urgency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark/50 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium">Attachment</label>
              <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-6 pt-5 pb-6">
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFile}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-primary hover:text-primary/80"
                >
                  Upload a file
                </label>
                {form.file && (
                  <p className="ml-2 text-sm text-gray-500">{form.file.name}</p>
                )}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="rounded-lg bg-primary/10 dark:bg-primary/20 p-4 space-y-2">
              <h4 className="text-sm font-semibold text-primary">
                AI-Powered Assistance
              </h4>
              <p className="text-sm text-primary/80">
                <span className="font-medium">Suggested Category:</span>{" "}
                {form.category}
              </p>
              <p className="text-sm text-primary/80">
                <span className="font-medium">Detected Urgency:</span>{" "}
                {form.urgency}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                className="rounded-lg border py-2 px-4 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 bg-primary text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-primary/90"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
