const { validateLog } = require('../src/validators/logs');

describe('validateLog', () => {
  test('valid log passes', () => {
    const data = { level: 'info', message: 'Started process' };
    const { isValid, errors } = validateLog(data);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('invalid level fails', () => {
    const data = { level: 'debug', message: 'Ignored' };
    const { isValid, errors } = validateLog(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('level');
  });

  test('empty message fails', () => {
    const data = { level: 'error', message: '' };
    const { isValid, errors } = validateLog(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('message');
  });
});
