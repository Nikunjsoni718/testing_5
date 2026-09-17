/**
 * Logger Module
 * Provides structured logging with log levels and timestamping.
 */
export class Logger {
  constructor(level = 'INFO') {
    this.levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
    this.currentLevel = this.levels[level.toUpperCase()] || 1;
  }

  _formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message) {
    if (this.currentLevel <= this.levels.DEBUG) {
      console.debug(this._formatMessage('DEBUG', message));
    }
  }

  info(message) {
    if (this.currentLevel <= this.levels.INFO) {
      console.info(this._formatMessage('INFO', message));
    }
  }

  warn(message) {
    if (this.currentLevel <= this.levels.WARN) {
      console.warn(this._formatMessage('WARN', message));
    }
  }

  error(message) {
    if (this.currentLevel <= this.levels.ERROR) {
      console.error(this._formatMessage('ERROR', message));
    }
  }
}
