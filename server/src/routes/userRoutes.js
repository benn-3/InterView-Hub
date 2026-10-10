import { Router } from 'express';
import { getProfile, updatePreferences } from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.use(requireAuth);

router.get('/me', getProfile);
router.patch('/me/preferences', updatePreferences);

export default router;
