const Admin = require('../AuthModel/AdminProfile');
const bcrypt = require('bcryptjs');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store admin info in session
    req.session.admin = {
      id: admin._id,
      email: admin.email,
    };

    res.status(200).json({ message: 'Login successful', admin: req.session.admin });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Logout function
const adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Default session cookie name
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = { adminLogin, adminLogout };