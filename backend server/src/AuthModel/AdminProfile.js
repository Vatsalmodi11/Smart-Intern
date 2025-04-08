const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Experience schema
const ExperienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
});

// Define the Profile schema
const ProfileSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  companyImage: { type: String, default: '' }, // Base64 string or URL
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Profile', ProfileSchema);