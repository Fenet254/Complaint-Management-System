const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Emoji or icon name
  type: { type: String, required: true }, // e.g., 'milestone', 'special', 'seasonal'
  criteria: {
    type: { type: String, required: true },
    value: { type: Number, required: true },
  },
  reward: {
    points: { type: Number, default: 0 },
    badge: { type: String }, // Badge name to award
  },
  isActive: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date }, // For seasonal achievements
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Achievement', achievementSchema);
