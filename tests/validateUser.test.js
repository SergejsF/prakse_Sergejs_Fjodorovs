const { validateUser } = require('../src/validators/users');

describe('validateUser', () => {
  test('valid data passes', () => {
    const data = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('empty name fails', () => {
    const data = { name: '   ', email: 'john@example.com', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('name');
  });

  test('missing name fails', () => {
    const data = { email: 'john@example.com', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('name');
  });

  test('short name fails', () => {
    const data = { name: 'A', email: 'john@example.com', password: 'password123' };
    const { isValid, errors } = validateUser(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('name');
  });

  test('invalid email fails', () => {
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
