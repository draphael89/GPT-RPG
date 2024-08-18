import chalk from 'chalk';

// Enum for log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Configuration object for the logger
interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  filePath?: string;
}

// Default configuration
const defaultConfig: LoggerConfig = {
  level: LogLevel.INFO,
  enableConsole: true,
  enableFile: false,
};

let config: LoggerConfig = { ...defaultConfig };

// Logger interface
interface Logger {
  configureLogger: (newConfig: Partial<LoggerConfig>) => void;
  debug: (message: string, metadata?: any) => void;
  info: (message: string, metadata?: any) => void;
  warn: (message: string, metadata?: any) => void;
  error: (message: string, metadata?: any) => void;
}

/**
 * Formats the log message with a timestamp and optional metadata.
 * @param level - The log level.
 * @param message - The main log message.
 * @param metadata - Optional metadata to include in the log.
 * @returns Formatted log string.
 */
function formatLog(level: LogLevel, message: string, metadata?: any): string {
  const timestamp = new Date().toISOString();
  const levelString = LogLevel[level].padEnd(5);
  const metadataString = metadata ? ` ${JSON.stringify(metadata)}` : '';
  return `[${timestamp}] ${levelString} - ${message}${metadataString}`;
}

/**
 * Logs a message to the console with color-coding based on log level.
 * @param level - The log level.
 * @param message - The log message.
 * @param metadata - Optional metadata to include in the log.
 */
function logToConsole(level: LogLevel, message: string, metadata?: any): void {
  const formattedMessage = formatLog(level, message, metadata);
  switch (level) {
    case LogLevel.DEBUG:
      console.log(chalk.gray(formattedMessage));
      break;
    case LogLevel.INFO:
      console.log(chalk.blue(formattedMessage));
      break;
    case LogLevel.WARN:
      console.warn(chalk.yellow(formattedMessage));
      break;
    case LogLevel.ERROR:
      console.error(chalk.red(formattedMessage));
      break;
  }
}

/**
 * Logs a message to a file (placeholder for future implementation).
 * @param level - The log level.
 * @param message - The log message.
 * @param metadata - Optional metadata to include in the log.
 */
function logToFile(level: LogLevel, message: string, metadata?: any): void {
  // Placeholder for file logging implementation
  // This would typically involve writing to a file using Node.js fs module
  console.log('File logging not implemented yet.');
}

/**
 * Main logging function that respects the configured log level and outputs.
 * @param level - The log level.
 * @param message - The log message.
 * @param metadata - Optional metadata to include in the log.
 */
function log(level: LogLevel, message: string, metadata?: any): void {
  if (level >= config.level) {
    if (config.enableConsole) {
      logToConsole(level, message, metadata);
    }
    if (config.enableFile && config.filePath) {
      logToFile(level, message, metadata);
    }
  }
}

// Create a logger object with all functions
const createLogger = (): Logger => ({
  configureLogger: (newConfig: Partial<LoggerConfig>) => {
    config = { ...config, ...newConfig };
  },
  debug: (message: string, metadata?: any) => log(LogLevel.DEBUG, message, metadata),
  info: (message: string, metadata?: any) => log(LogLevel.INFO, message, metadata),
  warn: (message: string, metadata?: any) => log(LogLevel.WARN, message, metadata),
  error: (message: string, metadata?: any) => log(LogLevel.ERROR, message, metadata),
});

// Lazy initialization of the logger
let loggerInstance: Logger | null = null;

const getLogger = (): Logger => {
  if (!loggerInstance) {
    loggerInstance = createLogger();
  }
  return loggerInstance;
};

// Add these lines for backwards compatibility
export const logDebug = (message: string, metadata?: any) => getLogger().debug(message, metadata);
export const logInfo = (message: string, metadata?: any) => getLogger().info(message, metadata);
export const logWarn = (message: string, metadata?: any) => getLogger().warn(message, metadata);
export const logError = (message: string, metadata?: any) => getLogger().error(message, metadata);

export default getLogger;