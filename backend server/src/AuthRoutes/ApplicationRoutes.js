const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Application = require('../AuthModel/ApplicationModel');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find();
    res.json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const applicationData = {
      userId: req.userId,
      jobId: req.body.jobId,
      userName: req.body.userName,
      userEmail: req.body.userEmail, // Added userEmail
      avatar: req.body.avatar,
      action: req.body.action,
      position: req.body.position,
      company: req.body.company,
      salary: req.body.salary,
      appliedAt: req.body.appliedAt,
      status: 'applied', // Default status
    };

    const application = new Application(applicationData);
    await application.save();

    res.status(201).json({ message: 'Application submitted', data: application });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const application = await Application.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found or unauthorized' });
    }

    res.json({ message: 'Application status updated', data: application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

module.exports = router;