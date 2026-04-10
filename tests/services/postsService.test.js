const mockExecute = jest.fn();

jest.mock('mysql2/promise', () => ({
  createPool: jest.fn(() => ({
    execute: mockExecute,
  })),
}));

const { createPost, getPosts } = require('../../db/index');

describe('DB post functions', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  test('createPost: successful INSERT returns insertId', async () => {
    mockExecute.mockResolvedValue([{ insertId: 7 }]);

    const result = await createPost(1, 'Test title', 'Test content body');

    expect(result).toBe(7);
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
      [1, 'Test title', 'Test content body']
    );
  });

  test('createPost: propagates INSERT error', async () => {
    mockExecute.mockRejectedValue(new Error('insert failed'));

    await expect(createPost(1, 'Test title', 'Test content body')).rejects.toThrow('insert failed');
  });

  test('getPosts: successful SELECT returns rows', async () => {
    const rows = [{ id: 1, title: 'A' }];
    mockExecute.mockResolvedValue([rows]);

    const result = await getPosts({ userId: 2, page: 3, limit: 4 });

    expect(result).toEqual(rows);
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM posts WHERE (? IS NULL OR user_id = ?) ORDER BY id DESC LIMIT ? OFFSET ?',
      [2, 2, 4, 8]
    );
  });

  test('getPosts: propagates SELECT error', async () => {
    mockExecute.mockRejectedValue(new Error('select failed'));

    await expect(getPosts({ userId: null, page: 1, limit: 10 })).rejects.toThrow('select failed');
  });
});