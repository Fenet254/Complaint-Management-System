"use client";

import React, { useEffect, useState } from "react";

interface Complaint {
  _id: string;
  title: string;
  category: string;
  status: string;
  urgency: string;
  submittedBy: {
    name: string;
    role: string;
  };
  createdAt: string;
