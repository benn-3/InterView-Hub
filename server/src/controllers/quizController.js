import { dataService } from '../services/dataService.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { isDbConnected } from '../config/database.js';

/**
 * Record a validated quiz attempt
 * POST /api/quizzes/attempts
 */
export async function saveQuizAttempt(req, res, next) {
  try {
    const {
      quizId,
      subject,
      totalQuestions,
      correctAnswers,
      durationSeconds = 0,
      answers = [],
    } = req.body;

    const user = req.user;

    const total = Number(totalQuestions);
    const correct = Number(correctAnswers);

    if (isNaN(total) || total < 1) {
      return res.status(400).json({ success: false, error: 'totalQuestions must be at least 1' });
    }

    if (isNaN(correct) || correct < 0 || correct > total) {
      return res.status(400).json({ success: false, error: 'correctAnswers must be between 0 and totalQuestions' });
    }

    // Verify score percentage server-side
    const scorePercentage = Math.round((correct / total) * 100);

    const attempt = await dataService.recordQuizAttempt({
      userId: user._id,
      quizId: String(quizId || 'general_quiz'),
      subject: String(subject || 'General'),
      totalQuestions: total,
      correctAnswers: correct,
      scorePercentage,
      durationSeconds: Number(durationSeconds) || 0,
      answers: Array.isArray(answers) ? answers : [],
      completedAt: new Date(),
    });

    // Record qualifying study activity and update streak
    const timeZone = req.body?.timeZone || req.query?.timeZone || 'UTC';
    const { streak } = await dataService.recordActivity(user, {
      activityType: 'quiz_completed',
      contentId: String(quizId || 'quiz_' + (subject || 'general')),
      subject: String(subject || 'General'),
      metadata: { scorePercentage, correct, total },
      timeZone,
    });

    return res.status(201).json({
      success: true,
      message: 'Quiz attempt recorded.',
      attempt: {
        id: attempt._id,
        quizId: attempt.quizId,
        subject: attempt.subject,
        totalQuestions: attempt.totalQuestions,
        correctAnswers: attempt.correctAnswers,
        scorePercentage: attempt.scorePercentage,
        completedAt: attempt.completedAt,
      },
      streak,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get paginated quiz history for authenticated user
 * GET /api/quizzes/history
 */
export async function getQuizHistory(req, res, next) {
  try {
    const user = req.user;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const subject = req.query.subject;

    let attempts = [];
    let total = 0;

    if (isDbConnected()) {
      const query = { userId: user._id };
      if (subject && subject !== 'all') {
        query.subject = new RegExp(`^${subject}$`, 'i');
      }

      [attempts, total] = await Promise.all([
        QuizAttempt.find(query)
          .sort({ completedAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        QuizAttempt.countDocuments(query),
      ]);
    } else {
      const result = await dataService.getQuizHistory(user._id, { limit, skip: (page - 1) * limit });
      attempts = result.attempts;
      total = result.total;
    }

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      attempts: attempts.map((a) => ({
        id: a._id.toString(),
        quizId: a.quizId,
        subject: a.subject,
        totalQuestions: a.totalQuestions,
        correctAnswers: a.correctAnswers,
        scorePercentage: a.scorePercentage,
        durationSeconds: a.durationSeconds,
        completedAt: a.completedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}
