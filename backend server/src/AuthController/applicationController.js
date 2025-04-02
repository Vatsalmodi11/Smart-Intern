const Application = require('../AuthModel/ApplicationModel');
const Job = require('../AuthModel/JobModel');

exports.createApplication = async (req, res) => {
  try {
    const {
      userId,
      jobId,
      userName,
      avatar,
      action,
      position,
      company,
      salary,
      appliedAt,
    } = req.body;

    console.log('Received application data:', req.body);

    if (!userId || !jobId || !userName || !action || !position || !company || !salary) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (position !== job.title || company !== job.company) {
      return res.status(400).json({
        message: 'Position or company does not match the job details',
      });
    }

    const application = new Application({
      userId,
      jobId,
      userName,
      avatar,
      action,
      position,
      company,
      salary,
      appliedAt: appliedAt || Date.now(),
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', data: application });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    console.log('Fetched applications:', applications);
    res.status(200).json({ data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.acceptApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'accepted';
    await application.save();

    console.log('Application accepted:', application);
    res.status(200).json({ message: 'Application accepted successfully', data: application });
  } catch (error) {
    console.error('Error accepting application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};