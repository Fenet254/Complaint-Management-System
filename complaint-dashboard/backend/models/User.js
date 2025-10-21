const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'staff', 'admin'], default: 'student' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  // Gamification fields
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }], // Array of badge names
  achievements: [{ type: String }], // Array of achievement names
  complaintsSubmitted: { type: Number, default: 0 },
  complaintsResolved: { type: Number, default: 0 },
  // Profile fields
  avatar: { type: String }, // URL to avatar image
  bio: { type: String },
  department: { type: String },
  // Notification preferences
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  pushNotifications: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

module.exports = mongoose.model('User', userSchema);
