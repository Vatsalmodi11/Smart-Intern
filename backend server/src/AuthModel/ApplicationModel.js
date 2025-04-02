const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: String, required: true },
  userName: { type: String, required: true },
  avatar: { type: String },
  action: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
});

// Check if the model already exists, otherwise define it
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = Application;