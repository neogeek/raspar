import { createHash } from 'node:crypto';

/**
 * Generate unique identifier from string.
 *
 * @example console.log(generateUUID('http://www.google.com/humans.txt'));
 * @param {String} content String to generate unique identifier.
 * @return {String}
 * @public
 */

const generateUUID = content =>
  createHash('sha256').update(content).digest('hex');

export default generateUUID;
