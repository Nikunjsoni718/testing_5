/**
 * String Helper Module
 * Provides utility functions for string manipulation and formatting.
 */
export class StringHelper {
  static capitalize(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str, length, ending = '...') {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= length) return str;
    return str.substring(0, length - ending.length) + ending;
  }

  static slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')   // Remove all non-word characters
      .replace(/\-\-+/g, '-');    // Replace multiple hyphens with a single one
  }
}
