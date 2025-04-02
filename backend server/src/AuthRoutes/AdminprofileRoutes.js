import express from 'express';
import { getProfile, updateProfile } from '../AuthController/AdminprofileController';

const router = express.Router();

router.get('/profile', getProfile); // Handles GET /api/profile
router.put('/profile', updateProfile); // Handles PUT /api/profile

export default router;