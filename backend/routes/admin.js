const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get admin dashboard stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const totalUsers = await User.countDocuments();

    res.json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get recent complaints for admin
router.get('/recent-complaints', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const complaints = await Complaint.find()
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
