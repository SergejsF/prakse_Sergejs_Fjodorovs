/**
 * Post modelis
 *
 * Tabula: posts
 *
 * Lauki:
 *   id         INT           - primārā atslēga, AUTO_INCREMENT
 *   user_id    INT           - ārējā atslēga uz users.id, NOT NULL
 *   title      VARCHAR(255)  - ziņas virsraksts, NOT NULL
 *   content    TEXT          - ziņas teksts, NOT NULL
 *   created_at TIMESTAMP     - ieraksta izveides laiks, DEFAULT CURRENT_TIMESTAMP
 *
 * Attiecības:
 *   posts.user_id -> users.id  (MANY-TO-ONE)
 */

class Post {
  /**
   * @param {number}  id
   * @param {number}  userId
   * @param {string}  title
   * @param {string}  content
   * @param {Date}    createdAt
   */
  constructor(id, userId, title, content, createdAt) {
    /** @type {number} - primārā atslēga */
    this.id = id;

    /** @type {number} - ārējā atslēga uz users.id */
    this.userId = userId;

    /** @type {string} - ziņas virsraksts */
    this.title = title;

    /** @type {string} - ziņas teksts */
    this.content = content;

    /** @type {Date} - ieraksta izveides laiks */
    this.createdAt = createdAt;
  }
}

module.exports = Post;
