const express = require('express');
const { adminLogin, adminLogout } = require('../AuthController/AdminprofileController');

const router = express.Router();

// POST /api/admin/login - Admin login
router.post('/login', adminLogin);

// POST /api/admin/logout - Admin logout
router.post('/logout', adminLogout);

module.exports = router;