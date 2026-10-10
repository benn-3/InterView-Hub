/**
 * Retrieve the current authenticated user's profile
 * GET /api/users/me
 */
export async function getProfile(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user.toPublicProfile(),
  });
}

/**
 * Update allowed preference fields
 * PATCH /api/users/me/preferences
 */
export async function updatePreferences(req, res, next) {
  try {
    const { theme, dailyGoalTopics, dailyGoalQuestions } = req.body;
    const user = req.user;

    if (theme !== undefined) {
      if (!['dark', 'light'].includes(theme)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid theme value. Allowed: "dark", "light"',
        });
      }
      user.preferences.theme = theme;
    }

    if (dailyGoalTopics !== undefined) {
      const num = Number(dailyGoalTopics);
      if (isNaN(num) || num < 1 || num > 50) {
        return res.status(400).json({
          success: false,
          error: 'dailyGoalTopics must be a number between 1 and 50',
        });
      }
      user.preferences.dailyGoalTopics = num;
    }

    if (dailyGoalQuestions !== undefined) {
      const num = Number(dailyGoalQuestions);
      if (isNaN(num) || num < 1 || num > 100) {
        return res.status(400).json({
          success: false,
          error: 'dailyGoalQuestions must be a number between 1 and 100',
        });
      }
      user.preferences.dailyGoalQuestions = num;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      preferences: user.preferences,
      message: 'Preferences updated successfully',
    });
  } catch (error) {
    next(error);
  }
}
