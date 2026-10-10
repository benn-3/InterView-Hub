import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Unique, immutable Google Subject Identifier
    googleSub: {
      type: String,
      required: true,
      unique: true,
      index: true,
      immutable: true,
    },
    // User email (normalized and indexed)
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Display name from Google
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Profile picture URL from Google
    picture: {
      type: String,
      default: '',
    },
    // Timestamps
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    // User UI & study preferences
    preferences: {
      theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'dark',
      },
      dailyGoalTopics: {
        type: Number,
        default: 5,
      },
      dailyGoalQuestions: {
        type: Number,
        default: 8,
      },
    },
    // Learning progress and bookmarks arrays
    bookmarkedQuestionIds: {
      type: [String],
      default: [],
    },
    bookmarkedLessonIds: {
      type: [String],
      default: [],
    },
    completedLessonIds: {
      type: [String],
      default: [],
    },
    flashcardProgress: {
      known: {
        type: [String],
        default: [],
      },
      needsRevision: {
        type: [String],
        default: [],
      },
    },
    codingProgress: {
      solved: {
        type: [String],
        default: [],
      },
      forReview: {
        type: [String],
        default: [],
      },
    },
    sqlProgress: {
      solved: {
        type: [String],
        default: [],
      },
    },
    lastVisitedLessonId: {
      type: String,
      default: null,
    },
    // Dynamic streak tracking
    streak: {
      currentStreak: {
        type: Number,
        default: 0,
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastActivityDate: {
        type: String, // YYYY-MM-DD
        default: null,
      },
      totalActivities: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        // Never expose sensitive fields
        return ret;
      },
    },
  }
);

import { computeActiveStreak } from '../services/streakService.js';

// Method to get clean public user profile
userSchema.methods.toPublicProfile = function (timeZone = 'UTC') {
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
};

export const User = mongoose.model('User', userSchema);
