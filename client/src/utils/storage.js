// LocalStorage Utility Module - Centralized Storage Architecture with Cloud Sync
import { progressApi } from '../services/api';

const STORAGE_KEYS = {
  THEME: 'interview_hub_theme',
  COMPLETED_TOPICS: 'interview_hub_completed',
  BOOKMARKS: 'interview_hub_bookmarks',
  IMPORTANT_TOPICS: 'interview_hub_important',
  DIFFICULT_TOPICS: 'interview_hub_difficult',
  NOTES: 'interview_hub_notes',
  RECENT_TOPICS: 'interview_hub_recents',
  MCQ_PROGRESS: 'interview_hub_mcq_progress',
  CODING_PROGRESS: 'interview_hub_coding_progress',
  SQL_PROGRESS: 'interview_hub_sql_progress',
  FLASHCARD_PROGRESS: 'interview_hub_flashcard_progress',
  MOCK_PROGRESS: 'interview_hub_mock_progress',
  STUDY_STREAK: 'interview_hub_streak',
  DAILY_ACTIVITY: 'interview_hub_daily_activity'
};

// Safe JSON parse helper
const getFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

// Safe JSON set helper
const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch storage event for reactive tabs/components
    window.dispatchEvent(new Event('interview_storage_updated'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// Theme Management
export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
};

export const setTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  document.documentElement.setAttribute('data-theme', theme);
  window.dispatchEvent(new Event('interview_storage_updated'));
};

// Completed Topics
export const getCompletedTopics = () => {
  return getFromStorage(STORAGE_KEYS.COMPLETED_TOPICS, []);
};

export const setCompletedTopic = (topicId, completed = true) => {
  const current = getCompletedTopics();
  let updated;
  if (completed) {
    if (!current.includes(topicId)) {
      updated = [...current, topicId];
      recordActivity('topic_completed');
      progressApi.completeLesson(topicId).catch(() => {});
    } else {
      updated = current;
    }
  } else {
    updated = current.filter(id => id !== topicId);
    progressApi.uncompleteLesson(topicId).catch(() => {});
  }
  setToStorage(STORAGE_KEYS.COMPLETED_TOPICS, updated);
  return updated;
};

export const toggleCompletedTopic = (topicId) => {
  const current = getCompletedTopics();
  const exists = current.includes(topicId);
  return setCompletedTopic(topicId, !exists);
};

// Bookmarks
export const getBookmarks = () => {
  return getFromStorage(STORAGE_KEYS.BOOKMARKS, []);
};

export const setBookmark = (topicId, bookmarked = true) => {
  const current = getBookmarks();
  let updated;
  if (bookmarked) {
    updated = current.includes(topicId) ? current : [...current, topicId];
    progressApi.addBookmark(topicId, 'lesson').catch(() => {});
  } else {
    updated = current.filter(id => id !== topicId);
    progressApi.removeBookmark(topicId).catch(() => {});
  }
  setToStorage(STORAGE_KEYS.BOOKMARKS, updated);
  return updated;
};

export const toggleBookmark = (topicId) => {
  const current = getBookmarks();
  const exists = current.includes(topicId);
  return setBookmark(topicId, !exists);
};

// Important Topics
export const getImportantTopics = () => {
  return getFromStorage(STORAGE_KEYS.IMPORTANT_TOPICS, []);
};

export const setImportantTopic = (topicId, important = true) => {
  const current = getImportantTopics();
  let updated;
  if (important) {
    updated = current.includes(topicId) ? current : [...current, topicId];
  } else {
    updated = current.filter(id => id !== topicId);
  }
  setToStorage(STORAGE_KEYS.IMPORTANT_TOPICS, updated);
  return updated;
};

export const toggleImportantTopic = (topicId) => {
  const current = getImportantTopics();
  const exists = current.includes(topicId);
  return setImportantTopic(topicId, !exists);
};

// Difficult Topics (Needs Revision)
export const getDifficultTopics = () => {
  return getFromStorage(STORAGE_KEYS.DIFFICULT_TOPICS, []);
};

export const setDifficultTopic = (topicId, difficult = true) => {
  const current = getDifficultTopics();
  let updated;
  if (difficult) {
    updated = current.includes(topicId) ? current : [...current, topicId];
  } else {
    updated = current.filter(id => id !== topicId);
  }
  setToStorage(STORAGE_KEYS.DIFFICULT_TOPICS, updated);
  return updated;
};

export const toggleDifficultTopic = (topicId) => {
  const current = getDifficultTopics();
  const exists = current.includes(topicId);
  return setDifficultTopic(topicId, !exists);
};

// Topic Personal Notes
export const getNotes = () => {
  return getFromStorage(STORAGE_KEYS.NOTES, {});
};

export const getNoteForTopic = (topicId) => {
  const notes = getNotes();
  return notes[topicId] || '';
};

export const setNote = (topicId, noteText) => {
  const notes = getNotes();
  if (!noteText || noteText.trim() === '') {
    delete notes[topicId];
  } else {
    notes[topicId] = noteText;
  }
  setToStorage(STORAGE_KEYS.NOTES, { ...notes });
  return notes;
};

// Recent Topics (Last Opened & History)
export const getRecentTopics = () => {
  return getFromStorage(STORAGE_KEYS.RECENT_TOPICS, []);
};

export const saveRecentTopic = (topic) => {
  if (!topic || !topic.id) return;
  const current = getRecentTopics();
  const filtered = current.filter(item => item.id !== topic.id);
  const entry = {
    id: topic.id,
    title: topic.title,
    subject: topic.subject,
    slug: topic.slug,
    path: topic.path,
    category: topic.category || topic.subject,
    timestamp: Date.now()
  };
  const updated = [entry, ...filtered].slice(0, 8); // Keep last 8
  setToStorage(STORAGE_KEYS.RECENT_TOPICS, updated);
  // Note: Opening a topic is passive browsing and not a qualifying study activity
  return updated;
};

export const getLastStudiedTopic = () => {
  const recents = getRecentTopics();
  return recents.length > 0 ? recents[0] : null;
};

// Qualifying study activity types
const QUALIFYING_ACTIVITIES = [
  'topic_completed',
  'mcq_solved',
  'coding_solved',
  'sql_solved',
  'flashcard_reviewed',
];

// Streak & Daily Activity Recording
export const recordActivity = (actionType = 'general', contentId = '', metadata = {}) => {
  try {
    if (!QUALIFYING_ACTIVITIES.includes(actionType)) {
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const daily = getFromStorage(STORAGE_KEYS.DAILY_ACTIVITY, {});

    if (!daily[today]) {
      daily[today] = { topics: 0, mcqs: 0, coding: 0, sql: 0, flashcards: 0, actions: 0 };
    }

    daily[today].actions += 1;
    if (actionType === 'topic_completed') {
      daily[today].topics += 1;
    } else if (actionType === 'mcq_solved') {
      daily[today].mcqs += 1;
    } else if (actionType === 'coding_solved') {
      daily[today].coding += 1;
    } else if (actionType === 'sql_solved') {
      daily[today].sql += 1;
    } else if (actionType === 'flashcard_reviewed') {
      daily[today].flashcards = (daily[today].flashcards || 0) + 1;
    }

    setToStorage(STORAGE_KEYS.DAILY_ACTIVITY, daily);
    updateStreak(today);

    // Also attempt cloud sync if authenticated session exists
    if (contentId) {
      progressApi.recordActivity({
        activityType: actionType === 'topic_completed' ? 'lesson_completed' : actionType,
        contentId,
        metadata,
      }).catch(() => {});
    }

    window.dispatchEvent(new Event('interview_storage_updated'));
  } catch (e) {
    console.error('Streak recording error:', e);
  }
};

const updateStreak = (today) => {
  const streakData = getFromStorage(STORAGE_KEYS.STUDY_STREAK, {
    currentStreak: 0,
    longestStreak: 0,
    lastDate: null,
  });

  if (streakData.lastDate === today) {
    // Already tracked for today: avoid duplicate increments
    return streakData;
  }

  let currentStreak = streakData.currentStreak || 0;
  if (!streakData.lastDate) {
    currentStreak = 1;
  } else {
    const last = new Date(streakData.lastDate + 'T00:00:00');
    const current = new Date(today + 'T00:00:00');
    const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }

  const longestStreak = Math.max(streakData.longestStreak || 0, currentStreak);
  const updatedStreak = {
    currentStreak,
    longestStreak,
    lastDate: today,
  };
  setToStorage(STORAGE_KEYS.STUDY_STREAK, updatedStreak);
  return updatedStreak;
};

export const getStreakData = () => {
  const today = new Date().toISOString().split('T')[0];
  const streak = getFromStorage(STORAGE_KEYS.STUDY_STREAK, {
    currentStreak: 0,
    longestStreak: 0,
    lastDate: null,
  });

  if (!streak.lastDate || streak.currentStreak === 0) {
    return {
      currentStreak: 0,
      longestStreak: streak.longestStreak || 0,
      lastDate: null,
      isActiveToday: false,
    };
  }

  const last = new Date(streak.lastDate + 'T00:00:00');
  const current = new Date(today + 'T00:00:00');
  const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return {
      currentStreak: streak.currentStreak,
      longestStreak: Math.max(streak.longestStreak || 0, streak.currentStreak),
      lastDate: streak.lastDate,
      isActiveToday: true,
    };
  }

  if (diffDays === 1) {
    // Active yesterday: streak preserved waiting for today
    return {
      currentStreak: streak.currentStreak,
      longestStreak: Math.max(streak.longestStreak || 0, streak.currentStreak),
      lastDate: streak.lastDate,
      isActiveToday: false,
    };
  }

  // Missed a calendar day: reset active streak to 0, preserve longest streak
  return {
    currentStreak: 0,
    longestStreak: streak.longestStreak || 0,
    lastDate: streak.lastDate,
    isActiveToday: false,
  };
};

export const getTodayGoals = () => {
  const today = new Date().toISOString().split('T')[0];
  const daily = getFromStorage(STORAGE_KEYS.DAILY_ACTIVITY, {});
  const todayData = daily[today] || { topics: 0, mcqs: 0, coding: 0, sql: 0, actions: 0 };
  
  const targetTopics = 5;
  const targetQuestions = 8;
  const targetMCQs = 10;
  
  return {
    topicsStudied: todayData.topics || 0,
    targetTopics,
    questionsSolved: (todayData.coding || 0) + (todayData.sql || 0),
    targetQuestions,
    mcqsCompleted: todayData.mcqs || 0,
    targetMCQs,
    overallPercent: Math.min(100, Math.round(((todayData.topics || 0) / targetTopics) * 100))
  };
};

// MCQ Practice Progress
export const getMCQProgress = () => {
  return getFromStorage(STORAGE_KEYS.MCQ_PROGRESS, {
    attempted: {},
    score: 0,
    correctCount: 0,
    incorrectCount: 0
  });
};

export const saveMCQAttempt = (questionId, selectedOption, isCorrect) => {
  const progress = getMCQProgress();
  const previouslyAnswered = !!progress.attempted[questionId];
  
  progress.attempted[questionId] = {
    selected: selectedOption,
    isCorrect,
    timestamp: Date.now()
  };

  if (!previouslyAnswered) {
    if (isCorrect) progress.correctCount += 1;
    else progress.incorrectCount += 1;
    recordActivity('mcq_solved');
  }

  setToStorage(STORAGE_KEYS.MCQ_PROGRESS, progress);
  return progress;
};

// Coding Practice Progress
export const getCodingProgress = () => {
  return getFromStorage(STORAGE_KEYS.CODING_PROGRESS, {
    solved: [],
    forReview: [],
    notes: {}
  });
};

export const setCodingStatus = (problemId, status, note = null) => {
  const progress = getCodingProgress();
  if (status === 'solved') {
    if (!progress.solved.includes(problemId)) {
      progress.solved.push(problemId);
      recordActivity('coding_solved');
    }
    progress.forReview = progress.forReview.filter(id => id !== problemId);
  } else if (status === 'review') {
    if (!progress.forReview.includes(problemId)) {
      progress.forReview.push(problemId);
    }
  } else if (status === 'unsolved') {
    progress.solved = progress.solved.filter(id => id !== problemId);
    progress.forReview = progress.forReview.filter(id => id !== problemId);
  }

  if (note !== null) {
    progress.notes[problemId] = note;
  }

  setToStorage(STORAGE_KEYS.CODING_PROGRESS, progress);
  return progress;
};

// SQL Practice Progress
export const getSQLProgress = () => {
  return getFromStorage(STORAGE_KEYS.SQL_PROGRESS, {
    solved: [],
    savedQueries: {}
  });
};

export const setSQLSolved = (problemId, query = '') => {
  const progress = getSQLProgress();
  if (!progress.solved.includes(problemId)) {
    progress.solved.push(problemId);
    recordActivity('sql_solved');
  }
  if (query) {
    progress.savedQueries[problemId] = query;
  }
  setToStorage(STORAGE_KEYS.SQL_PROGRESS, progress);
  return progress;
};

// Flashcards Progress
export const getFlashcardProgress = () => {
  return getFromStorage(STORAGE_KEYS.FLASHCARD_PROGRESS, {
    known: [],
    needsRevision: []
  });
};

export const setFlashcardStatus = (cardId, status) => {
  const progress = getFlashcardProgress();
  if (status === 'known') {
    if (!progress.known.includes(cardId)) progress.known.push(cardId);
    progress.needsRevision = progress.needsRevision.filter(id => id !== cardId);
  } else if (status === 'revision') {
    if (!progress.needsRevision.includes(cardId)) progress.needsRevision.push(cardId);
    progress.known = progress.known.filter(id => id !== cardId);
  }
  setToStorage(STORAGE_KEYS.FLASHCARD_PROGRESS, progress);
  progressApi.updateFlashcard(cardId, status).catch(() => {});
  return progress;
};

// Mock Interview Progress
export const getMockInterviewProgress = () => {
  return getFromStorage(STORAGE_KEYS.MOCK_PROGRESS, {
    completedSessions: 0,
    answers: {}
  });
};

export const saveMockResult = (sessionId, scores) => {
  const progress = getMockInterviewProgress();
  progress.completedSessions += 1;
  progress.answers[sessionId] = { scores, timestamp: Date.now() };
  setToStorage(STORAGE_KEYS.MOCK_PROGRESS, progress);
  recordActivity('mock_interview');
  return progress;
};

// Settings Actions
export const clearBookmarks = () => {
  setToStorage(STORAGE_KEYS.BOOKMARKS, []);
};

export const clearNotes = () => {
  setToStorage(STORAGE_KEYS.NOTES, {});
};

export const resetProgress = () => {
  setToStorage(STORAGE_KEYS.COMPLETED_TOPICS, []);
  setToStorage(STORAGE_KEYS.MCQ_PROGRESS, { attempted: {}, score: 0, correctCount: 0, incorrectCount: 0 });
  setToStorage(STORAGE_KEYS.CODING_PROGRESS, { solved: [], forReview: [], notes: {} });
  setToStorage(STORAGE_KEYS.SQL_PROGRESS, { solved: [], savedQueries: {} });
  setToStorage(STORAGE_KEYS.FLASHCARD_PROGRESS, { known: [], needsRevision: [] });
  setToStorage(STORAGE_KEYS.MOCK_PROGRESS, { completedSessions: 0, answers: {} });
};

export const resetAllData = () => {
  Object.values(STORAGE_KEYS).forEach(k => {
    localStorage.removeItem(k);
  });
  window.dispatchEvent(new Event('interview_storage_updated'));
};
