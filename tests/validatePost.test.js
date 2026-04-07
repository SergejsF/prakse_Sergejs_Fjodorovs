const { validatePost } = require('../src/validators/posts');

describe('validatePost', () => {
  test('valid post passes', () => {
    const data = { title: 'Hello', content: 'This is a valid post content.' };
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

  test('short content fails', () => {
    const data = { title: 'Hi', content: 'short' };
    const { isValid, errors } = validatePost(data);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('content');
  });
});
