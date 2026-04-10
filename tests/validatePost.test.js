const { validatePost } = require('../src/validators/posts');

describe('validatePost', () => {
  test('valid post passes', () => {
    const data = { userId: 1, title: 'Hello', content: 'This is a valid post content.' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('empty title fails', () => {
    const data = { title: '', content: 'This is a valid content with enough length.' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('title');
  });

  test('too short title fails', () => {
    const data = { title: 'Hi', content: 'This is a valid content with enough length.' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('title');
  });

  test('short content fails', () => {
    const data = { title: 'Valid title', content: 'short' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('content');
  });

  test('empty content fails', () => {
    const data = { title: 'Valid title', content: '    ' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('content');
  });
});
