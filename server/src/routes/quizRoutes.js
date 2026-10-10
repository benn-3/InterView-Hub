import { Router } from 'express';
import { saveQuizAttempt, getQuizHistory } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.use(requireAuth);

router.get('/history', getQuizHistory);
router.post('/attempts', saveQuizAttempt);

export default router;
