import { body, param, query, validationResult } from 'express-validator';

/**
 * Middleware to check validation results and respond with formatted errors.
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  };
};

/**
 * Auth validators
 */
export const validateGoogleAuth = validate([
  body('idToken')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('idToken is required and must be a valid string'),
]);

/**
 * Quiz attempt validators
 */
export const validateQuizAttempt = validate([
  body('subject')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('subject is required'),
  body('totalQuestions')
    .isInt({ min: 1 })
    .withMessage('totalQuestions must be an integer greater than 0'),
  body('score')
    .optional()
    .isInt({ min: 0 })
    .withMessage('score must be a non-negative integer'),
]);

/**
 * Bookmark validators
 */
export const validateBookmark = validate([
  body('contentId')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('contentId is required'),
  body('type')
    .optional()
    .isString()
    .isIn(['lesson', 'question', 'flashcard'])
    .withMessage('type must be one of: lesson, question, flashcard'),
]);

/**
 * Flashcard status validators
 */
export const validateFlashcardStatus = validate([
  body('status')
    .isString()
    .isIn(['mastered', 'reviewing', 'unseen'])
    .withMessage('status must be one of: mastered, reviewing, unseen'),
]);
