// controllers/AuthController.js
const User = require('../AuthModel/UserModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { userType, firstName, lastName, companyName, email, phone, password, skills, experience, industry, companySize } = req.body;

    if (userType === 'jobseeker' && (!firstName || !lastName || !skills)) {
      return res.status(400).json({ message: 'Missing required jobseeker fields' });
    }
    if (userType === 'recruiter' && (!companyName || !industry)) {
      return res.status(401).json({ message: 'Missing required recruiter fields' });
    }
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      userType,
      firstName: userType === 'jobseeker' ? firstName : undefined,
      lastName: userType === 'jobseeker' ? lastName : undefined,
      companyName: userType === 'recruiter' ? companyName : undefined,
      email,
      phone: phone || '',
      password,
      skills: userType === 'jobseeker' ? skills : undefined,
      experience: userType === 'jobseeker' ? experience || 0 : undefined,
      industry: userType === 'recruiter' ? industry : undefined,
      companySize: userType === 'recruiter' ? companySize : undefined
    });

    await user.save();
    res.status(201).json({ userId: user._id, message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ userId: user._id, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const responseData = {
      userType: user.userType,
      email: user.email,
      phone: user.phone,
    };

    if (user.userType === 'jobseeker') {
      Object.assign(responseData, {
        firstName: user.firstName,
        lastName: user.lastName,
        skills: user.skills,
        experience: user.experience,
      });
    } else if (user.userType === 'recruiter') {
      Object.assign(responseData, {
        companyName: user.companyName,
        industry: user.industry,
        companySize: user.companySize,
      });
    }

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};