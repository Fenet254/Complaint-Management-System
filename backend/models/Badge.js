const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Emoji or icon name
  color: { type: String, default: '#667eea' }, // Hex color
  criteria: {
    type: { type: String, required: true }, // e.g., 'complaints_submitted', 'complaints_resolved', 'points_earned'
    value: { type: Number, required: true }, // Threshold value
  },
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], default: 'common' },
  points: { type: Number, default: 0 }, // Points awarded when earned
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Badge', badgeSchema);
