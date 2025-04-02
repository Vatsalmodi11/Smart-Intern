const express = require('express');
const router = express.Router();
const jobController = require('../AuthController/jobController');

router.get('/', jobController.getJobs);
router.post('/', jobController.createJob);

module.exports = router;