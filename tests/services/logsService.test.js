const mockExecute = jest.fn();

jest.mock('mysql2/promise', () => ({
  createPool: jest.fn(() => ({
    execute: mockExecute,
  })),
}));

const { createLog, getLogs } = require('../../db/index');

describe('DB log functions', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  test('createLog: successful INSERT returns insertId', async () => {
    mockExecute.mockResolvedValue([{ insertId: 11 }]);

    const result = await createLog('info', 'User created');

    expect(result).toBe(11);
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO logs (`level`, message) VALUES (?, ?)',
      ['info', 'User created']
    );
  });

  test('createLog: propagates INSERT error', async () => {
    mockExecute.mockRejectedValue(new Error('insert failed'));

    await expect(createLog('info', 'User created')).rejects.toThrow('insert failed');
  });

  test('getLogs: successful SELECT returns rows', async () => {
    const rows = [{ id: 1, level: 'error' }];
    mockExecute.mockResolvedValue([rows]);

    const result = await getLogs({ level: 'error', page: 1, limit: 3 });

    expect(result).toEqual(rows);
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM logs WHERE `level` = ? ORDER BY id DESC LIMIT 0, 3',
      ['error']
    );
  });

  test('getLogs: propagates SELECT error', async () => {
    mockExecute.mockRejectedValue(new Error('select failed'));

    await expect(getLogs({ level: null, page: 1, limit: 10 })).rejects.toThrow('select failed');
  });
});