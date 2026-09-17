/**
 * Data Validator Module
 * Provides utility functions for validating common payload structures.
 */

export class DataValidator {
  static isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
  }

  static isNonEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0;
  }

  static isPositiveInteger(num) {
    return Number.isInteger(num) && num > 0;
  }

  static validateUserPayload(payload) {
    const errors = [];
    
    if (!payload) {
      return { valid: false, errors: ['Payload is required'] };
    }
    
    if (!this.isNonEmptyString(payload.username)) {
      errors.push('Username must be a non-empty string');
    }
    
    if (!this.isEmail(payload.email)) {
      errors.push('Valid email is required');
    }
    
    if (payload.age !== undefined && !this.isPositiveInteger(payload.age)) {
      errors.push('Age must be a positive integer');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
