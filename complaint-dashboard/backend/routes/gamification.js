const express = require('express');
const User = require('../models/User');
const Badge = require('../models/Badge');
const Achievement = require('../models/Achievement');
const authMiddleware = require('../middleware/auth');
const gamificationService = require('../services/gamificationService');

const router = express.Router();

// Get user gamification stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await gamificationService.getUserStats(req.user.id);
    if (!stats) {
      return res.status(404).json({ msg: 'User stats not found' });
    }
    res.json(stats);
  } catch (err) {
    console.error('Error getting user stats:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = await gamificationService.getLeaderboard(limit);
    res.json(leaderboard);
  } catch (err) {
    console.error('Error getting leaderboard:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all badges
router.get('/badges', authMiddleware, async (req, res) => {
  try {
    const badges = await Badge.find({ isActive: true });
    res.json(badges);
  } catch (err) {
    console.error('Error getting badges:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all achievements
router.get('/achievements', authMiddleware, async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true });
    res.json(achievements);
  } catch (err) {
    console.error('Error getting achievements:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Award manual points (admin only)
router.post('/award-points', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { userId, points, reason } = req.body;

    if (!userId || !points || !reason) {
      return res.status(400).json({ msg: 'User ID, points, and reason are required' });
    }

    await gamificationService.awardPoints(userId, points, reason);

    res.json({ msg: 'Points awarded successfully' });
  } catch (err) {
    console.error('Error awarding points:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create a new badge (admin only)
router.post('/badges', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const badge = new Badge(req.body);
    await badge.save();

    res.status(201).json(badge);
  } catch (err) {
    console.error('Error creating badge:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create a new achievement (admin only)
router.post('/achievements', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const achievement = new Achievement(req.body);
    await achievement.save();

    res.status(201).json(achievement);
  } catch (err) {
    console.error('Error creating achievement:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
