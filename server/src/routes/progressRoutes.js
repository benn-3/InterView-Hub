import { Router } from 'express';
import {
  getProgress,
  syncProgress,
  completeLesson,
  uncompleteLesson,
  addBookmark,
  removeBookmark,
  updateFlashcardStatus,
  recordStudyActivity,
  getDashboardStats,
} from '../controllers/progressController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getProgress);
router.put('/', syncProgress);

router.get('/dashboard', getDashboardStats);
router.post('/activity', recordStudyActivity);

router.post('/lessons/:lessonId/complete', completeLesson);
router.post('/lessons/:lessonId/uncomplete', uncompleteLesson);

router.post('/bookmarks', addBookmark);
router.delete('/bookmarks/:contentId', removeBookmark);

router.put('/flashcards/:flashcardId', updateFlashcardStatus);

export default router;
