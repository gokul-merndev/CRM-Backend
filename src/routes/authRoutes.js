import { Router } from 'express';
import { currentUser, loginUser } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validation/schemas.js';

const router = Router();
router.post('/login', validate(loginSchema), loginUser);
router.get('/me', requireAuth, currentUser);
export default router;
