const { validateUser } = require('../src/validators/users');

describe('validateUser', () => {
  test('valid data passes', () => {
    const data = { email: 'john@example.com', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('nederīgs e-pasts neiztur', () => {
    const data = { name: 'John', email: 'not-an-email', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('email');
  });

  test('empty email fails', () => {
    const data = { name: 'John', email: '', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('email');
  });

  test('short password fails', () => {
    const data = { name: 'John', email: 'john@example.com', password: 'short' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('password');
  });

  test('missing password fails', () => {
    const data = { name: 'John', email: 'john@example.com' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('password');
  });
});
