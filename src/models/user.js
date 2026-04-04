/**
 * User modelis
 *
 * Tabula: users
 *
 * Lauki:
 *   id           INT           - primārā atslēga, AUTO_INCREMENT
 *   email        VARCHAR(255)  - unikāla e-pasta adrese, NOT NULL
 *   password_hash VARCHAR(255) - šifrēta parole (bcrypt), NOT NULL
 *   created_at   TIMESTAMP     - ieraksta izveides laiks, DEFAULT CURRENT_TIMESTAMP
 */

class User {
  /**
   * @param {number}  id
   * @param {string}  email
   * @param {string}  passwordHash
   * @param {Date}    createdAt
   */
  constructor(id, email, passwordHash, createdAt) {
    /** @type {number} - primārā atslēga */
    this.id = id;

    /** @type {string} - unikāla e-pasta adrese */
    this.email = email;

    /** @type {string} - bcrypt šifrēta parole */
    this.passwordHash = passwordHash;

    /** @type {Date} - ieraksta izveides laiks */
    this.createdAt = createdAt;
  }
}

module.exports = User;
