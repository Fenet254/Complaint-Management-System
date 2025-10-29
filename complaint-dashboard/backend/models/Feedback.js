const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String },
  satisfaction: { type: String, enum: ['very_satisfied', 'satisfied', 'neutral', 'dissatisfied', 'very_dissatisfied'] },
  wouldRecommend: { type: Boolean },
  improvementSuggestions: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Index for better query performance
feedbackSchema.index({ complaintId: 1 });
feedbackSchema.index({ userId: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
