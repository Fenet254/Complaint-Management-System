"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UniversityWorkerComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
