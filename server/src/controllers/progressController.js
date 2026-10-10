import { dataService } from '../services/dataService.js';
import { computeActiveStreak } from '../services/streakService.js';

/**
 * Get all progress data for current authenticated user
 * GET /api/progress
 */
export async function getProgress(req, res) {
  const user = req.user;
  const timeZone = req.query?.timeZone || 'UTC';
  const activeStreak = computeActiveStreak(user.streak, timeZone);

  return res.status(200).json({
    success: true,
    progress: {
      completedLessonIds: user.completedLessonIds || [],
      bookmarkedLessonIds: user.bookmarkedLessonIds || [],
      bookmarkedQuestionIds: user.bookmarkedQuestionIds || [],
      flashcardProgress: user.flashcardProgress || { known: [], needsRevision: [] },
      codingProgress: user.codingProgress || { solved: [], forReview: [] },
      sqlProgress: user.sqlProgress || { solved: [] },
      lastVisitedLessonId: user.lastVisitedLessonId || null,
      preferences: user.preferences,
      streak: activeStreak,
      studyStats: {
        completedLessonsCount: (user.completedLessonIds || []).length,
        bookmarkedQuestionsCount: (user.bookmarkedQuestionIds || []).length,
        bookmarkedLessonsCount: (user.bookmarkedLessonIds || []).length,
        flashcardsMasteredCount: ((user.flashcardProgress || {}).known || []).length,
        codingSolvedCount: ((user.codingProgress || {}).solved || []).length,
        sqlSolvedCount: ((user.sqlProgress || {}).solved || []).length,
      },
    },
  });
}

/**
 * Merge / Synchronize local storage progress into user account
 * PUT /api/progress
 */
export async function syncProgress(req, res, next) {
  try {
    const user = req.user;
    const {
      completedLessonIds = [],
      bookmarkedLessonIds = [],
      bookmarkedQuestionIds = [],
      flashcardProgress = {},
      codingSolvedIds = [],
      sqlSolvedIds = [],
      lastVisitedLessonId,
    } = req.body;

    // Merge completed lessons safely using Sets
    if (Array.isArray(completedLessonIds)) {
      const merged = new Set([...user.completedLessonIds, ...completedLessonIds.map(String)]);
      user.completedLessonIds = Array.from(merged);
    }

    // Merge bookmarked lessons
    if (Array.isArray(bookmarkedLessonIds)) {
      const merged = new Set([...user.bookmarkedLessonIds, ...bookmarkedLessonIds.map(String)]);
      user.bookmarkedLessonIds = Array.from(merged);
    }

    // Merge bookmarked questions
    if (Array.isArray(bookmarkedQuestionIds)) {
      const merged = new Set([...user.bookmarkedQuestionIds, ...bookmarkedQuestionIds.map(String)]);
      user.bookmarkedQuestionIds = Array.from(merged);
    }

    // Merge flashcards
    if (flashcardProgress) {
      if (Array.isArray(flashcardProgress.known)) {
        const mergedKnown = new Set([...(user.flashcardProgress.known || []), ...flashcardProgress.known.map(String)]);
        user.flashcardProgress.known = Array.from(mergedKnown);
      }
      if (Array.isArray(flashcardProgress.needsRevision)) {
        const mergedRev = new Set([...(user.flashcardProgress.needsRevision || []), ...flashcardProgress.needsRevision.map(String)]);
        user.flashcardProgress.needsRevision = Array.from(mergedRev);
      }
    }

    // Merge coding & SQL
    if (Array.isArray(codingSolvedIds)) {
      const merged = new Set([...(user.codingProgress.solved || []), ...codingSolvedIds.map(String)]);
      user.codingProgress.solved = Array.from(merged);
    }
    if (Array.isArray(sqlSolvedIds)) {
      const merged = new Set([...(user.sqlProgress.solved || []), ...sqlSolvedIds.map(String)]);
      user.sqlProgress.solved = Array.from(merged);
    }

    if (lastVisitedLessonId && typeof lastVisitedLessonId === 'string') {
      user.lastVisitedLessonId = lastVisitedLessonId;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Progress synchronized successfully.',
      progress: {
        completedLessonIds: user.completedLessonIds,
        bookmarkedLessonIds: user.bookmarkedLessonIds,
        bookmarkedQuestionIds: user.bookmarkedQuestionIds,
        flashcardProgress: user.flashcardProgress,
        codingProgress: user.codingProgress,
        sqlProgress: user.sqlProgress,
        lastVisitedLessonId: user.lastVisitedLessonId,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Mark a lesson as completed
 * POST /api/progress/lessons/:lessonId/complete
 */
export async function completeLesson(req, res, next) {
  try {
    const { lessonId } = req.params;
    const user = req.user;
    const timeZone = req.body?.timeZone || req.query?.timeZone || 'UTC';

    if (!user.completedLessonIds.includes(lessonId)) {
      user.completedLessonIds.push(lessonId);
      user.lastVisitedLessonId = lessonId;
    }

    const { streak } = await dataService.recordActivity(user, {
      activityType: 'lesson_completed',
      contentId: lessonId,
      timeZone,
    });

    return res.status(200).json({
      success: true,
      completed: true,
      lessonId,
      completedLessonIds: user.completedLessonIds,
      streak,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Mark a lesson as uncompleted
 * POST /api/progress/lessons/:lessonId/uncomplete
 */
export async function uncompleteLesson(req, res, next) {
  try {
    const { lessonId } = req.params;
    const user = req.user;

    user.completedLessonIds = user.completedLessonIds.filter((id) => id !== lessonId);
    await user.save();

    return res.status(200).json({
      success: true,
      completed: false,
      lessonId,
      completedLessonIds: user.completedLessonIds,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Add a bookmark (question or lesson)
 * POST /api/progress/bookmarks
 */
export async function addBookmark(req, res, next) {
  try {
    const { contentId, type = 'lesson' } = req.body;
    const user = req.user;

    if (!contentId || typeof contentId !== 'string') {
      return res.status(400).json({ success: false, error: 'Valid contentId is required.' });
    }

    if (type === 'question') {
      if (!user.bookmarkedQuestionIds.includes(contentId)) {
        user.bookmarkedQuestionIds.push(contentId);
      }
    } else {
      if (!user.bookmarkedLessonIds.includes(contentId)) {
        user.bookmarkedLessonIds.push(contentId);
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      bookmarked: true,
      contentId,
      type,
      bookmarkedLessonIds: user.bookmarkedLessonIds,
      bookmarkedQuestionIds: user.bookmarkedQuestionIds,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Remove a bookmark
 * DELETE /api/progress/bookmarks/:contentId
 */
export async function removeBookmark(req, res, next) {
  try {
    const { contentId } = req.params;
    const user = req.user;

    user.bookmarkedLessonIds = user.bookmarkedLessonIds.filter((id) => id !== contentId);
    user.bookmarkedQuestionIds = user.bookmarkedQuestionIds.filter((id) => id !== contentId);

    await user.save();

    return res.status(200).json({
      success: true,
      bookmarked: false,
      contentId,
      bookmarkedLessonIds: user.bookmarkedLessonIds,
      bookmarkedQuestionIds: user.bookmarkedQuestionIds,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update flashcard review status
 * PUT /api/progress/flashcards/:flashcardId
 */
export async function updateFlashcardStatus(req, res, next) {
  try {
    const { flashcardId } = req.params;
    const { status, timeZone = 'UTC' } = req.body; // 'known' | 'revision' | 'reset'
    const user = req.user;

    if (!['known', 'revision', 'reset'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Allowed values: "known", "revision", "reset"',
      });
    }

    user.flashcardProgress.known = user.flashcardProgress.known.filter((id) => id !== flashcardId);
    user.flashcardProgress.needsRevision = user.flashcardProgress.needsRevision.filter((id) => id !== flashcardId);

    let streak = null;
    if (status === 'known') {
      user.flashcardProgress.known.push(flashcardId);
      const resActivity = await dataService.recordActivity(user, {
        activityType: 'flashcard_reviewed',
        contentId: flashcardId,
        timeZone,
      });
      streak = resActivity.streak;
    } else if (status === 'revision') {
      user.flashcardProgress.needsRevision.push(flashcardId);
      const resActivity = await dataService.recordActivity(user, {
        activityType: 'flashcard_reviewed',
        contentId: flashcardId,
        timeZone,
      });
      streak = resActivity.streak;
    } else {
      await user.save();
    }

    return res.status(200).json({
      success: true,
      flashcardId,
      status,
      flashcardProgress: user.flashcardProgress,
      streak,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Record a qualifying study activity (question solved, coding solved, sql solved, etc.)
 * POST /api/progress/activity
 */
export async function recordStudyActivity(req, res, next) {
  try {
    const { activityType, contentId, subject = '', metadata = {}, timeZone = 'UTC' } = req.body;
    const user = req.user;

    const validTypes = [
      'lesson_completed',
      'quiz_completed',
      'question_solved',
      'coding_solved',
      'sql_solved',
      'flashcard_reviewed',
    ];

    if (!activityType || !validTypes.includes(activityType)) {
      return res.status(400).json({
        success: false,
        error: `Invalid activityType. Allowed types: ${validTypes.join(', ')}`,
      });
    }

    if (!contentId || typeof contentId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'contentId is required and must be a string.',
      });
    }

    const result = await dataService.recordActivity(user, {
      activityType,
      contentId,
      subject,
      metadata,
      timeZone,
    });

    return res.status(200).json({
      success: true,
      message: 'Qualifying study activity recorded.',
      streak: result.streak,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get dynamic dashboard statistics including greeting, streaks, and analytics
 * GET /api/progress/dashboard
 */
export async function getDashboardStats(req, res, next) {
  try {
    const user = req.user;
    const timeZone = req.query?.timeZone || 'UTC';
    const stats = await dataService.getDashboardStats(user, timeZone);

    return res.status(200).json({
      success: true,
      ...stats,
    });
  } catch (error) {
    next(error);
  }
}
