/**
 * Streak and Calendar Date Utilities
 */

/**
 * Returns formatted calendar date (YYYY-MM-DD) for a given date in a specific timezone.
 * Defaults to UTC or system local if timezone is invalid.
 */
export function getCalendarDate(date = new Date(), timeZone = 'UTC') {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timeZone || 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date instanceof Date ? date : new Date(date));
  } catch (err) {
    return new Date(date).toISOString().split('T')[0];
  }
}

/**
 * Computes difference in calendar days between two YYYY-MM-DD strings.
 */
export function getDaysDifference(dateStr1, dateStr2) {
  if (!dateStr1 || !dateStr2) return Infinity;
  const d1 = new Date(dateStr1 + 'T00:00:00Z');
  const d2 = new Date(dateStr2 + 'T00:00:00Z');
  const diffMs = d2.getTime() - d1.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Computes current active streak without mutating records.
 * If user completed an activity yesterday, the streak remains intact today.
 * If user missed full calendar day (daysDiff > 1), active streak drops to 0.
 */
export function computeActiveStreak(streakData = {}, timeZone = 'UTC') {
  const currentStreak = Number(streakData.currentStreak) || 0;
  const longestStreak = Number(streakData.longestStreak) || 0;
  const lastActivityDate = streakData.lastActivityDate || null;
  const totalActivities = Number(streakData.totalActivities) || 0;

  if (!lastActivityDate || currentStreak === 0) {
    return {
      currentStreak: 0,
      longestStreak,
      lastActivityDate: null,
      totalActivities,
      isActiveToday: false,
    };
  }

  const todayStr = getCalendarDate(new Date(), timeZone);
  const daysDiff = getDaysDifference(lastActivityDate, todayStr);

  if (daysDiff === 0) {
    // Activity already completed today
    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      lastActivityDate,
      totalActivities,
      isActiveToday: true,
    };
  }

  if (daysDiff === 1) {
    // Active yesterday: streak is intact and waiting for today's activity
    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      lastActivityDate,
      totalActivities,
      isActiveToday: false,
    };
  }

  // Missed at least one calendar day (daysDiff > 1)
  return {
    currentStreak: 0,
    longestStreak,
    lastActivityDate,
    totalActivities,
    isActiveToday: false,
  };
}

/**
 * Safely updates a user's streak in response to a newly recorded qualifying study activity.
 * Prevents multiple increments on the same day.
 * Extends streak on consecutive days.
 * Resets current streak to 1 on broken streaks while preserving longest streak.
 */
export function recordUserActivityStreak(user, timeZone = 'UTC') {
  if (!user.streak) {
    user.streak = {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      totalActivities: 0,
    };
  }

  const todayStr = getCalendarDate(new Date(), timeZone);
  user.streak.totalActivities = (user.streak.totalActivities || 0) + 1;

  const lastDate = user.streak.lastActivityDate;

  if (!lastDate) {
    // First activity ever recorded
    user.streak.currentStreak = 1;
    user.streak.longestStreak = Math.max(user.streak.longestStreak || 0, 1);
    user.streak.lastActivityDate = todayStr;
  } else if (lastDate === todayStr) {
    // Multiple activities on the same day: keep streak identical, do not increment again
    user.streak.longestStreak = Math.max(user.streak.longestStreak || 0, user.streak.currentStreak);
  } else {
    const daysDiff = getDaysDifference(lastDate, todayStr);

    if (daysDiff === 1) {
      // Consecutive calendar day
      user.streak.currentStreak = (user.streak.currentStreak || 0) + 1;
      user.streak.longestStreak = Math.max(user.streak.longestStreak || 0, user.streak.currentStreak);
      user.streak.lastActivityDate = todayStr;
    } else if (daysDiff > 1) {
      // Broken streak: reset current streak to 1, preserve longest streak
      user.streak.currentStreak = 1;
      user.streak.longestStreak = Math.max(user.streak.longestStreak || 0, 1);
      user.streak.lastActivityDate = todayStr;
    }
  }

  return computeActiveStreak(user.streak, timeZone);
}
