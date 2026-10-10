/**
 * Centralized Application Error Handling Middleware
 */
export function errorHandler(err, req, res, next) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Sanitize logging
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: messages,
    });
  }

  // Mongoose Duplicate Key Error (e.g. unique googleSub)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `A record with this ${field} already exists.`,
    });
  }

  // Rate limit error
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: err.message || 'Too many requests, please try again later.',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = isProduction && statusCode === 500
    ? 'An unexpected internal server error occurred.'
    : err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
