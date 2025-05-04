// models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ['jobseeker', 'recruiter'], required: true },
  firstName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
  lastName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
  companyName: { type: String, required: function () { return this.userType === 'recruiter'; } },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  skills: { type: String, default: '', required: function () { return this.userType === 'jobseeker'; } },
  experience: { type: Number, default: 0 },
  industry: { type: String, default: '', required: function () { return this.userType === 'recruiter'; } },
  companySize: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);






// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const experienceSchema = new mongoose.Schema({
//   role: { type: String, required: true },
//   company: { type: String, required: true },
//   period: { type: String, required: true }
// });

// const userSchema = new mongoose.Schema({
//   userType: { type: String, enum: ['jobseeker', 'recruiter'], required: true },
//   firstName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
//   lastName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
//   companyName: { type: String, required: function () { return this.userType === 'recruiter'; } },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   phone: { type: String, default: '' },
//   password: { type: String, required: true },
//   title: { type: String, default: '' },
//   department: { type: String, default: '' },
//   location: { type: String, default: '' },
//   bio: { type: String, default: '' },
//   skills: { type: [String], default: [] },
//   experience: { type: [experienceSchema], default: [] },
//   companyImage: { type: String, default: null },
//   industry: { type: String, default: '' },
//   companySize: { type: String, default: '' },
//   collegeName: { type: String, default: '' },
//   createdAt: { type: Date, default: Date.now },
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);






// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const experienceSchema = new mongoose.Schema({
//   role: { type: String, required: true },
//   company: { type: String, required: true },
//   period: { type: String, required: true }
// });

// const userSchema = new mongoose.Schema({
//   userType: { type: String, enum: ['jobseeker', 'recruiter'], required: true },
//   firstName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
//   lastName: { type: String, required: function () { return this.userType === 'jobseeker'; } },
//   companyName: { type: String, required: function () { return this.userType === 'recruiter'; } },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   phone: { type: String, default: '' },
//   password: { type: String, required: true },
//   title: { type: String, default: '' },
//   department: { type: String, default: '' },
//   location: { type: String, default: '' },
//   bio: { type: String, default: '' },
//   skills: { type: [String], default: [], required: function () { return this.userType === 'jobseeker'; } },
//   experience: { type: [experienceSchema], default: [] },
//   companyImage: { type: String, default: null },
//   industry: { type: String, default: '', required: function () { return this.userType === 'recruiter'; } },
//   companySize: { type: String, default: '' },
//   collegeName: { type: String, default: '' },
//   createdAt: { type: Date, default: Date.now }
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);

