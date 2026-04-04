/**
 * Log modelis
 *
 * Tabula: logs
 *
 * Lauki:
 *   id         INT           - primārā atslēga, AUTO_INCREMENT
 *   user_id    INT           - ārējā atslēga uz users.id, var būt NULL (sistēmas darbības)
 *   action     VARCHAR(255)  - veiktā darbība (piemēram: 'register', 'login'), NOT NULL
 *   created_at TIMESTAMP     - notikuma laiks, DEFAULT CURRENT_TIMESTAMP
 *
 * Attiecības:
 *   logs.user_id -> users.id  (MANY-TO-ONE, nullable)
 */

class Log {
  /**
   * @param {number}       id
   * @param {number|null}  userId
   * @param {string}       action
   * @param {Date}         createdAt
   */
  constructor(id, userId, action, createdAt) {
    /** @type {number} - primārā atslēga */
    this.id = id;

    /** @type {number|null} - ārējā atslēga uz users.id (var būt null) */
    this.userId = userId;

    /** @type {string} - veiktā darbība */
    this.action = action;

    /** @type {Date} - notikuma laiks */
    this.createdAt = createdAt;
  }
}

module.exports = Log;
