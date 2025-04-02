const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  salaryRange: { type: String },
  department: { type: String },
  status: { type: String },
  description: { type: String, required: true },
  requirements: { type: [String] },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, otherwise define it
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

module.exports = Job;