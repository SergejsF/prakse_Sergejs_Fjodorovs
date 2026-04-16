const request = require('supertest');

jest.mock('../../src/services/posts', () => ({
  createPostService: jest.fn(),
  listPostsService: jest.fn(),
}));

const { createPostService, listPostsService } = require('../../src/services/posts');
const app = require('../../src/app');

function resetMockedDatabaseState() {
  jest.clearAllMocks();
}

describe('Posts routes integration', () => {
  beforeEach(() => {
    // Mockētās DB izolācija: šis atiestatījums nodrošina testu nošķiršanu.
    resetMockedDatabaseState();
  });

  test('POST /posts returns 201 for valid body', async () => {
    createPostService.mockResolvedValue(44);

    const response = await request(app).post('/posts').send({
      userId: 1,
      title: 'Valid title',
      content: 'This is valid post content',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 44 });
  });

  test('POST /posts returns 400 for empty body', async () => {
    const response = await request(app).post('/posts').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('VALIDATION_ERROR');
    expect(response.body.details).toHaveProperty('title');
    expect(response.body.details).toHaveProperty('content');
  });

  test('GET /posts returns 200 with data', async () => {
    listPostsService.mockResolvedValue([{ id: 1, title: 'A' }]);

    const response = await request(app).get('/posts?page=1&limit=10');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(10);
  });

  test('GET /posts returns 500 for service error', async () => {
    listPostsService.mockRejectedValue(new Error('db fail'));

    const response = await request(app).get('/posts');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Iekšēja servera kļūda' });
  });
});