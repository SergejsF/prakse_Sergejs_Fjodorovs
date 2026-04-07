function validateLog(data) {
  const errors = {};

  const allowedLevels = ['info', 'warn', 'error'];
  if (!data.level || !allowedLevels.includes(data.level)) {
    errors.level = 'Level must be one of: info, warn, error';
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateLog };
