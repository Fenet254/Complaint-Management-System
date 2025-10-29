const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Expanded categories: for students - academic, facilities, admin, financial, harassment, tech; for workers - workplace, resources, admin
  urgency: { type: String, required: true },
  attachment: { type: String }, // file path or URL
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aiCategory: { type: String }, // AI-assigned category
  sentiment: { type: String }, // Sentiment analysis result
  tags: [{ type: String }], // AI-generated tags
  priority: { type: Number, default: 1 }, // AI-calculated priority
  feedback: { type: String }, // Post-resolution feedback
  rating: { type: Number, min: 1, max: 5 }, // User rating
  resolutionTime: { type: Number }, // Time in hours to resolve
  isAnonymous: { type: Boolean, default: false }, // Anonymity flag
  anonymousHash: { type: String }, // Hash for anonymous tracking
  department: { type: String }, // Target department for routing
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for better query performance
complaintSchema.index({ category: 1, status: 1 });
complaintSchema.index({ submittedBy: 1 });
complaintSchema.index({ aiCategory: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);
