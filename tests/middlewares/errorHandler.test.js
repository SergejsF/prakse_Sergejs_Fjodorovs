const { errorHandler } = require('../../src/middlewares/errorHandler');

function createRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('errorHandler middleware', () => {
  test('returns 409 and EMAIL_EXISTS for ER_DUP_ENTRY', () => {
    const err = { code: 'ER_DUP_ENTRY' };
    const req = {};
    const res = createRes();
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'EMAIL_EXISTS' });
  });

  test('returns 500 and internal error for generic errors', () => {
    const err = new Error('unexpected');
    const req = {};
    const res = createRes();
    const next = jest.fn();
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});