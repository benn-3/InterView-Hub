import { Router } from 'express';
import { googleAuth, getCurrentUser, logout } from '../controllers/authController.js';

const router = Router();

router.post('/google', googleAuth);
router.get('/me', getCurrentUser);
router.post('/logout', logout);

export default router;
