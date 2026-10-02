import { Router } from 'express';
import authRoutes from './authRoutes.js';
import leadRoutes from './leadRoutes.js';
import companyRoutes from './companyRoutes.js';
import taskRoutes from './taskRoutes.js';
import { requireAuth } from '../middleware/auth.js';
import { summary } from '../controllers/dashboardController.js';
import { list as listUsers } from '../controllers/userController.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/leads', requireAuth, leadRoutes);
router.use('/companies', requireAuth, companyRoutes);
router.use('/tasks', requireAuth, taskRoutes);
router.get('/dashboard', requireAuth, summary);
router.get('/users', requireAuth, listUsers);
export default router;
