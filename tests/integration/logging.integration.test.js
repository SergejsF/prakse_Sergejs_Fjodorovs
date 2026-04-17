const request = require('supertest');

// Mockēsim DB moduļa createLog, lai pārbaudītu, ka žurnāls tiek saglabāts
jest.mock('../../db/index', () => ({
  createLog: jest.fn(),
  getLogs: jest.fn(),
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getUserByEmail: jest.fn(),
  createPost: jest.fn(),
  getPosts: jest.fn(),
  pool: {},
}));

jest.mock('../../src/services/posts', () => ({
  createPostService: jest.fn(),
  listPostsService: jest.fn(),
}));

const db = require('../../db/index');
const postsService = require('../../src/services/posts');
const app = require('../../src/app');

describe('Logging integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  async function waitForLogCall() {
    for (let i = 0; i < 20; i += 1) {
      if (db.createLog.mock.calls.length > 0) {
        return;
      }
      // Winston transports raksta asinhroni; pagaidām nākamo event loop tiklu
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }

  test('Invalid JSON request is logged and returns 400', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Content-Type', 'application/json')
      .send('{ bad json');

    expect(res.status).toBe(400);
    await waitForLogCall();
    expect(db.createLog).toHaveBeenCalled();

    const call = db.createLog.mock.calls[0];
    expect(call[0]).toBeDefined(); // līmenis
    // Ziņojums ir JSON virkne, ko sagatavo loggeris
    const stored = JSON.parse(call[1]);
    expect(stored).toHaveProperty('timestamp');
    expect(stored).toHaveProperty('message');
    expect(stored).toHaveProperty('meta');
    expect(stored.meta).toBeDefined();
  });

  test('Service DB error is logged with code and stack', async () => {
    postsService.listPostsService.mockRejectedValue(Object.assign(new Error('db fail'), { code: 'ER_CUSTOM' }));

    const res = await request(app).get('/posts');

    expect(res.status).toBe(500);
    await waitForLogCall();
    expect(db.createLog).toHaveBeenCalled();

    const call = db.createLog.mock.calls[0];
    const stored = JSON.parse(call[1]);
    expect(stored).toHaveProperty('timestamp');
    expect(stored.message).toBe('Server error');
    expect(stored).toHaveProperty('meta');
    // Meta laukā tiek nodota pieprasījuma informācija
    expect(stored.meta).toBeDefined();
    expect(stored.meta.errorMessage).toBe('db fail');
    expect(stored.code).toBe('ER_CUSTOM');
  });
});
