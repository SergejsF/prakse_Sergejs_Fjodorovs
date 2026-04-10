const mockExecute = jest.fn();

jest.mock('mysql2/promise', () => ({
  createPool: jest.fn(() => ({
    execute: mockExecute,
  })),
}));

const { createUser, getUsers } = require('../../db/index');

describe('DB user functions', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  test('createUser: successful INSERT returns insertId', async () => {
    mockExecute.mockResolvedValue([{ insertId: 42 }]);

    const result = await createUser('john@example.com', 'hash');

    expect(result).toBe(42);
    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      ['john@example.com', 'hash']
    );
  });

  test('createUser: propagates INSERT error', async () => {
    const dbError = new Error('insert failed');
    mockExecute.mockRejectedValue(dbError);

    await expect(createUser('john@example.com', 'hash')).rejects.toThrow('insert failed');
  });

  test('getUsers: successful SELECT returns rows', async () => {
    const rows = [{ id: 1, email: 'john@example.com' }];
    mockExecute.mockResolvedValue([rows]);

    const result = await getUsers({ email: 'john', page: 2, limit: 5 });

    expect(result).toEqual(rows);
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE (? IS NULL OR email LIKE ?) LIMIT ? OFFSET ?',
      ['john', '%john%', 5, 5]
    );
  });

  test('getUsers: propagates SELECT error', async () => {
    const dbError = new Error('select failed');
    mockExecute.mockRejectedValue(dbError);

    await expect(getUsers({ email: null, page: 1, limit: 10 })).rejects.toThrow('select failed');
  });
});