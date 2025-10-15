const express = require('express');
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const aiService = require('../services/aiService');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create a complaint with AI processing
router.post('/', authMiddleware, upload.single('attachment'), async (req, res) => {
  try {
    const { title, description, category, urgency } = req.body;
    const attachment = req.file ? req.file.path : null;

    // AI processing
    const [aiCategory, sentiment, tags, priority] = await Promise.all([
      aiService.categorizeComplaint(title, description),
      aiService.analyzeSentiment(description),
      aiService.generateTags(title, description),
      aiService.calculatePriority(title, description, urgency)
    ]);

    const complaint = new Complaint({
      title,
      description,
      category,
      urgency,
      attachment,
      submittedBy: req.user.id,
      aiCategory,
      sentiment,
      tags,
      priority,
      points: 10, // Base points for submission
    });

    await complaint.save();

    // Update user stats and gamification
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        points: 10,
        complaintsSubmitted: 1
      }
    });

    // Check for badge achievements
    const gamificationService = require('../services/gamificationService');
    await gamificationService.checkBadgeAchievements(req.user.id);
    await gamificationService.checkAchievements(req.user.id);

    res.status(201).json({
      ...complaint.toObject(),
      aiInsights: {
        suggestedCategory: aiCategory,
        sentiment,
        tags,
        priority
      }
    });
  } catch (err) {
    console.error('Error creating complaint:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all complaints (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const complaints = await Complaint.find().populate('submittedBy', 'name email role');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get complaints for logged-in user
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ submittedBy: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get complaint by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('submittedBy', 'name email role');
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    // Check access
    if (req.user.role !== 'admin' && complaint.submittedBy._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update complaint status (admin)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id).populate('submittedBy');
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    const oldStatus = complaint.status;
    complaint.status = status;
    complaint.updatedAt = Date.now();

    // Calculate resolution time if resolved
    if (status === 'Resolved' && oldStatus !== 'Resolved') {
      complaint.resolutionTime = Math.ceil((Date.now() - complaint.createdAt) / (1000 * 60 * 60)); // hours

      // Award points for resolution
      const gamificationService = require('../services/gamificationService');
      await gamificationService.awardPoints(complaint.submittedBy._id, 5, 'complaint resolved');

      // Update admin stats
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { complaintsResolved: 1 }
      });
    }

    await complaint.save();

    // Real-time notification
    const io = req.app.get('io');
    io.to(`user-${complaint.submittedBy._id}`).emit('complaint-update', {
      complaintId: complaint._id,
      status: complaint.status,
      message: `Your complaint "${complaint.title}" has been ${status.toLowerCase()}`
    });

    io.to('admin-room').emit('complaint-status-changed', {
      complaintId: complaint._id,
      oldStatus,
      newStatus: status,
      updatedBy: req.user.name
    });

    res.json(complaint);
  } catch (err) {
    console.error('Error updating complaint status:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add feedback to resolved complaint
router.post('/:id/feedback', authMiddleware, async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    if (complaint.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    if (complaint.status !== 'Resolved') {
      return res.status(400).json({ msg: 'Complaint must be resolved to add feedback' });
    }

    complaint.feedback = feedback;
    complaint.rating = rating;
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error('Error adding feedback:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
