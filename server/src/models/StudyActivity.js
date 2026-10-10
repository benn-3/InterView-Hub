import mongoose from 'mongoose';

const studyActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: [
        'lesson_completed',
        'quiz_completed',
        'question_solved',
        'coding_solved',
        'sql_solved',
        'flashcard_reviewed',
      ],
      index: true,
    },
    contentId: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      default: '',
      trim: true,
    },
    // Calendar date formatted as YYYY-MM-DD to enforce day-boundary uniqueness
    activityDate: {
      type: String,
      required: true,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index preventing duplicate entries for the same item on the same day
studyActivitySchema.index(
  { userId: 1, activityDate: 1, activityType: 1, contentId: 1 },
  { unique: true }
);

export const StudyActivity = mongoose.model('StudyActivity', studyActivitySchema);
