import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';
import userRoutes from './users.js';
import jobRoutes from './jobs.js';
import applicationRoutes from './applications.js'; // 👈 your applications.js file

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes); // 👈 Mount here

export default router;
