const express = require('express');
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');
const authMiddleware = require('../middleware/auth'); // Assuming auth middleware exists

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

// Create a complaint
router.post('/', authMiddleware, upload.single('attachment'), async (req, res) => {
  try {
    const { title, description, category, urgency } = req.body;
    const attachment = req.file ? req.file.path : null;
    const complaint = new Complaint({
      title,
      description,
      category,
      urgency,
      attachment,
      submittedBy: req.user.id,
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
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
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    complaint.status = status;
    complaint.updatedAt = Date.now();
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
