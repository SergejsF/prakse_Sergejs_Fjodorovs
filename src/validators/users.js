function validateUser(data) {
  const errors = {};

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Nederīgs e-pasta formāts';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Parolei jābūt vismaz 8 simbolu garai';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateUser };
