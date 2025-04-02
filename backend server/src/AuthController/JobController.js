const Job = require('../AuthModel/JobModel');

exports.getJobs = async (req, res) => {
  try {
    const { search, department, location, status, startDate, endDate } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (department) query.department = department;
    if (location) query.location = location;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    console.log('Fetching jobs with query:', query);
    const jobs = await Job.find(query);
    console.log('Jobs fetched:', jobs);
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salaryRange,
      department,
      status,
      description,
      requirements,
      logo,
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      type,
      salaryRange,
      department,
      status,
      description,
      requirements,
      logo,
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully', data: job });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};