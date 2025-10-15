const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get analytics data (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Complaint statistics
    const totalComplaints = await Complaint.countDocuments();
    const complaintsByStatus = await Complaint.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const complaintsByCategory = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const complaintsByUrgency = await Complaint.aggregate([
      { $group: { _id: '$urgency', count: { $sum: 1 } } }
    ]);

    // Time-based analytics
    const complaintsLast30Days = await Complaint.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Average resolution time
    const resolvedComplaints = await Complaint.find({
      status: 'Resolved',
      resolutionTime: { $exists: true }
    });
    const avgResolutionTime = resolvedComplaints.length > 0
      ? resolvedComplaints.reduce((sum, c) => sum + c.resolutionTime, 0) / resolvedComplaints.length
      : 0;

    // User engagement
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Gamification stats
    const topUsers = await User.find()
      .select('name points level complaintsSubmitted')
      .sort({ points: -1 })
      .limit(10);

    // Sentiment analysis
    const sentimentStats = await Complaint.aggregate([
      { $group: { _id: '$sentiment', count: { $sum: 1 } } }
    ]);

    res.json({
      overview: {
        totalComplaints,
        totalUsers,
        activeUsers,
        complaintsLast30Days,
        avgResolutionTime: Math.round(avgResolutionTime * 10) / 10
      },
      complaints: {
        byStatus: complaintsByStatus,
        byCategory: complaintsByCategory,
        byUrgency: complaintsByUrgency,
        bySentiment: sentimentStats
      },
      gamification: {
        topUsers
      }
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user-specific analytics
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this data
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userComplaints = await Complaint.find({ submittedBy: userId });
    const resolvedComplaints = userComplaints.filter(c => c.status === 'Resolved');

    const avgRating = resolvedComplaints.length > 0
      ? resolvedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0) / resolvedComplaints.length
      : 0;

    res.json({
      user: {
        name: user.name,
        points: user.points,
        level: user.level,
        badges: user.badges,
        achievements: user.achievements
      },
      complaints: {
        total: userComplaints.length,
        resolved: resolvedComplaints.length,
        pending: userComplaints.filter(c => c.status === 'Pending').length,
        inProgress: userComplaints.filter(c => c.status === 'In Progress').length,
        avgRating: Math.round(avgRating * 10) / 10
      }
    });
  } catch (err) {
    console.error('User analytics error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
