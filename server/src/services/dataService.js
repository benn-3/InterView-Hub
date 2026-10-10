import { User } from '../models/User.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { StudyActivity } from '../models/StudyActivity.js';
import { isDbConnected } from '../config/database.js';
import {
  computeActiveStreak,
  recordUserActivityStreak,
  getCalendarDate,
} from './streakService.js';

// In-memory fallback stores for development/evaluation when MongoDB Atlas is not yet configured
const memUsersById = new Map();
const memUsersBySub = new Map();
const memQuizAttempts = [];
const memActivities = [];

class MemoryUser {
  constructor(data) {
    this._id = data._id || 'dev_user_' + Date.now();
    this.googleSub = data.googleSub;
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture || '';
    this.preferences = {
      theme: 'dark',
      dailyGoalTopics: 5,
      dailyGoalQuestions: 8,
      ...(data.preferences || {}),
    };
    this.bookmarkedQuestionIds = data.bookmarkedQuestionIds || [];
    this.bookmarkedLessonIds = data.bookmarkedLessonIds || [];
    this.completedLessonIds = data.completedLessonIds || [];
    this.flashcardProgress = {
      known: data.flashcardProgress?.known || [],
      needsRevision: data.flashcardProgress?.needsRevision || [],
    };
    this.codingProgress = {
      solved: data.codingProgress?.solved || [],
      forReview: data.codingProgress?.forReview || [],
    };
    this.sqlProgress = {
      solved: data.sqlProgress?.solved || [],
    };
    this.streak = {
      currentStreak: data.streak?.currentStreak || 0,
      longestStreak: data.streak?.longestStreak || 0,
      lastActivityDate: data.streak?.lastActivityDate || null,
      totalActivities: data.streak?.totalActivities || 0,
    };
    this.lastVisitedLessonId = data.lastVisitedLessonId || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
    this.lastLoginAt = data.lastLoginAt || new Date();
  }

  async save() {
    this.updatedAt = new Date();
    memUsersById.set(this._id.toString(), this);
    memUsersBySub.set(this.googleSub, this);
    return this;
  }

  toPublicProfile(timeZone = 'UTC') {
    const activeStreak = computeActiveStreak(this.streak, timeZone);
    return {
      id: this._id.toString(),
      googleSub: this.googleSub,
      email: this.email,
      name: this.name,
      picture: this.picture,
      preferences: this.preferences,
      streak: activeStreak,
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt,
      studyStats: {
        completedLessonsCount: (this.completedLessonIds || []).length,
        bookmarkedQuestionsCount: (this.bookmarkedQuestionIds || []).length,
        bookmarkedLessonsCount: (this.bookmarkedLessonIds || []).length,
        flashcardsMasteredCount: (this.flashcardProgress?.known || []).length,
        codingSolvedCount: (this.codingProgress?.solved || []).length,
        sqlSolvedCount: (this.sqlProgress?.solved || []).length,
      },
    };
  }
}

export const dataService = {
  async findUserBySub(googleSub) {
    if (isDbConnected()) {
      return await User.findOne({ googleSub });
    }
    return memUsersBySub.get(googleSub) || null;
  },

  async findUserById(userId) {
    if (isDbConnected()) {
      return await User.findById(userId);
    }
    return memUsersById.get(userId.toString()) || null;
  },

  async createUser(userData) {
    if (isDbConnected()) {
      return await User.create(userData);
    }
    const memUser = new MemoryUser(userData);
    await memUser.save();
    return memUser;
  },

  async recordQuizAttempt(attemptData) {
    if (isDbConnected()) {
      return await QuizAttempt.create(attemptData);
    }
    const record = {
      _id: 'attempt_' + Date.now(),
      ...attemptData,
      createdAt: new Date(),
    };
    memQuizAttempts.unshift(record);
    return record;
  },

  async getQuizHistory(userId, { limit = 20, skip = 0 } = {}) {
    if (isDbConnected()) {
      const attempts = await QuizAttempt.find({ userId })
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      const total = await QuizAttempt.countDocuments({ userId });
      return { attempts, total };
    }
    const userAttempts = memQuizAttempts.filter((a) => a.userId.toString() === userId.toString());
    const total = userAttempts.length;
    const attempts = userAttempts.slice(skip, skip + limit);
    return { attempts, total };
  },

  /**
   * Record a qualifying study activity (lesson, quiz, code, sql, flashcard)
   * and automatically update the user's streak in MongoDB.
   */
  async recordActivity(user, { activityType, contentId, subject = '', metadata = {}, timeZone = 'UTC' }) {
    const activityDate = getCalendarDate(new Date(), timeZone);
    let savedActivity = null;

    if (isDbConnected()) {
      try {
        savedActivity = await StudyActivity.create({
          userId: user._id,
          activityType,
          contentId: String(contentId),
          subject: String(subject),
          activityDate,
          metadata,
        });
      } catch (err) {
        // Safe deduplication: duplicate key (11000) for same content on same day is expected
        if (err.code !== 11000) {
          console.warn('[Activity] Non-fatal creation notice:', err.message);
        }
      }
    } else {
      const existing = memActivities.find(
        (a) =>
          a.userId === user._id.toString() &&
          a.activityDate === activityDate &&
          a.activityType === activityType &&
          a.contentId === contentId
      );
      if (!existing) {
        savedActivity = {
          _id: 'act_' + Date.now(),
          userId: user._id.toString(),
          activityType,
          contentId,
          subject,
          activityDate,
          createdAt: new Date(),
        };
        memActivities.push(savedActivity);
      }
    }

    // Update streak on user document
    const updatedStreak = recordUserActivityStreak(user, timeZone);
    await user.save();

    return { activity: savedActivity, streak: updatedStreak };
  },

  /**
   * Get dynamic dashboard statistics for authenticated user
   */
  async getDashboardStats(user, timeZone = 'UTC') {
    const todayStr = getCalendarDate(new Date(), timeZone);
    const activeStreak = computeActiveStreak(user.streak, timeZone);

    let todayActivityCount = 0;
    if (isDbConnected()) {
      todayActivityCount = await StudyActivity.countDocuments({
        userId: user._id,
        activityDate: todayStr,
      });
    } else {
      todayActivityCount = memActivities.filter(
        (a) => a.userId === user._id.toString() && a.activityDate === todayStr
      ).length;
    }

    return {
      user: user.toPublicProfile(timeZone),
      streak: activeStreak,
      todayActivities: todayActivityCount,
    };
  },
};
