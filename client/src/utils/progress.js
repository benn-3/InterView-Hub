import {
  getCompletedTopics,
  getBookmarks,
  getImportantTopics,
  getDifficultTopics,
  getMCQProgress,
  getCodingProgress,
  getSQLProgress,
  getFlashcardProgress,
  getMockInterviewProgress,
  getStreakData
} from './storage';
import { allTopics, getSubjects, toSlug } from './markdownLoader';

/**
 * Calculates complete application progress analytics
 */
export const calculateAnalytics = () => {
  const completedIds = getCompletedTopics();
  const bookmarkIds = getBookmarks();
  const importantIds = getImportantTopics();
  const difficultIds = getDifficultTopics();

  const totalTopics = allTopics.length;
  const completedTopicsCount = completedIds.length;
  const remainingTopicsCount = Math.max(0, totalTopics - completedTopicsCount);
  const overallPercentage = totalTopics > 0 
    ? Math.min(100, Math.round((completedTopicsCount / totalTopics) * 100)) 
    : 0;

  // Subjects breakdown
  const subjects = getSubjects();
  const subjectProgress = subjects.map(subj => {
    const subjTopics = subj.topics;
    const completedInSubj = subjTopics.filter(t => completedIds.includes(t.id)).length;
    const percent = subjTopics.length > 0 
      ? Math.round((completedInSubj / subjTopics.length) * 100) 
      : 0;

    return {
      name: subj.name,
      slug: subj.slug,
      total: subjTopics.length,
      completed: completedInSubj,
      percent
    };
  });

  // Practice analytics
  const mcq = getMCQProgress();
  const totalMCQsAttempted = Object.keys(mcq.attempted || {}).length;
  const mcqAccuracy = totalMCQsAttempted > 0 
    ? Math.round((mcq.correctCount / totalMCQsAttempted) * 100) 
    : 0;

  const coding = getCodingProgress();
  const codingSolvedCount = (coding.solved || []).length;
  const codingReviewCount = (coding.forReview || []).length;

  const sql = getSQLProgress();
  const sqlSolvedCount = (sql.solved || []).length;

  const flashcards = getFlashcardProgress();
  const flashcardsReviewedCount = (flashcards.known || []).length + (flashcards.needsRevision || []).length;

  const mock = getMockInterviewProgress();
  const mockSessionsCount = mock.completedSessions || 0;

  const streak = getStreakData();

  return {
    totalTopics,
    completedTopicsCount,
    remainingTopicsCount,
    overallPercentage,
    bookmarksCount: bookmarkIds.length,
    importantCount: importantIds.length,
    difficultCount: difficultIds.length,
    subjectProgress,
    practice: {
      totalMCQsAttempted,
      mcqCorrect: mcq.correctCount || 0,
      mcqIncorrect: mcq.incorrectCount || 0,
      mcqAccuracy,
      codingSolvedCount,
      codingReviewCount,
      sqlSolvedCount,
      flashcardsReviewedCount,
      mockSessionsCount
    },
    streak
  };
};

/**
 * Calculates progress for a single subject
 */
export const getSubjectProgress = (subjectSlug) => {
  const completedIds = getCompletedTopics();
  const targetSlug = toSlug(subjectSlug);
  const subjectTopics = allTopics.filter(t => toSlug(t.subject) === targetSlug);
  
  if (subjectTopics.length === 0) return { total: 0, completed: 0, percent: 0 };

  const completed = subjectTopics.filter(t => completedIds.includes(t.id)).length;
  return {
    total: subjectTopics.length,
    completed,
    percent: Math.round((completed / subjectTopics.length) * 100)
  };
};
