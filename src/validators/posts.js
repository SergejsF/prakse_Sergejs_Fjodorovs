function validatePost(data) {
  const errors = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.title = 'Virsrakstam jābūt vismaz 3 simboliem';
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
    errors.content = 'Saturam jābūt vismaz 10 simboliem';
  }

  // Saskaņā ar shēmu `posts.user_id` ir NOT NULL — pieprasām `userId`
  if (data.userId === undefined || data.userId === null) {
    errors.userId = 'userId ir obligāts';
  } else {
    const id = parseInt(data.userId, 10);
    if (Number.isNaN(id) || id <= 0) {
      errors.userId = 'userId jābūt pozitīvam veselam skaitlim';
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validatePost };
