/**
 * @typedef {Object} AppConfig
 * @property {string} API_BASE 
 * @property {string} DEVICONS_CDN 
 * @property {Readonly<Record<string,string>>} REQUEST_HEADERS 
 * @property {number} MAX_CONTRIBUTORS 
 * @property {number} MAX_LANGUAGES 
 */

/** @type {Readonly<AppConfig>} */
const CONFIG = Object.freeze({
  API_BASE: 'https://api.github.com',
  DEVICONS_CDN: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons',
  REQUEST_HEADERS: Object.freeze({
    Accept: 'application/vnd.github.v3+json',
  }),
  MAX_CONTRIBUTORS: 7,
  MAX_LANGUAGES: 8,
});
