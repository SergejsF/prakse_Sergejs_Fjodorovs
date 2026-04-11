const request = require('supertest');

jest.mock('../../src/services/users', () => ({
  registerUser: jest.fn(),
  listUsers: jest.fn(),
}));

const { registerUser, listUsers } = require('../../src/services/users');
const app = require('../../src/app');

function resetMockedDatabaseState() {
  jest.clearAllMocks();
}

describe('Users routes integration', () => {
  beforeEach(() => {
    // Mocked DB isolation: this reset acts as table cleanup between tests.
    resetMockedDatabaseState();
  });

  test('POST /users returns 201 for valid body', async () => {
    registerUser.mockResolvedValue(123);

    const response = await request(app).post('/users').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 123 });
  });

  test('POST /users returns 409 for duplicate email', async () => {
    const err = new Error('duplicate');
    err.code = 'ER_DUP_ENTRY';
    registerUser.mockRejectedValue(err);

    const response = await request(app).post('/users').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ error: 'EMAIL_EXISTS' });
  });

  test('POST /users returns 400 for empty body', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('VALIDATION_ERROR');
    expect(response.body.details).toHaveProperty('email');
    expect(response.body.details).toHaveProperty('password');
  });

  test('GET /users returns 200 with data', async () => {
    listUsers.mockResolvedValue([{ id: 1, email: 'john@example.com' }]);

    const response = await request(app).get('/users?page=1&limit=10');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(10);
  });
});