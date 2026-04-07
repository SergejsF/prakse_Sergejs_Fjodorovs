function validatePost(data) {
  const errors = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
    errors.content = 'Content must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validatePost };
