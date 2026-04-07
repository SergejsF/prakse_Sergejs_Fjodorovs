function validateUser(data) {
  const errors = {};
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateUser };
