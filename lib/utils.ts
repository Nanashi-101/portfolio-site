/**
 * Utility functions for error handling and common operations
 */

/**
 * Validates a string value against length constraints
 * @param value - The value to validate
 * @param maxlength - Maximum allowed string length (default: 500)
 * @returns True if valid, false otherwise
 */
export const validateString = (value: unknown, maxlength: number = 500): boolean => {
  if (!value || typeof value !== "string" || value.length > maxlength) {
    return false;
  }
  return true;
};

/**
 * Extracts error message from various error types
 * @param error - Error object, Error instance, or string
 * @returns Formatted error message string
 */
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occurred";
  }

  return message;
};

/**
 * Delays execution for a specified number of milliseconds
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Clamps a number between min and max values
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Converts a value to a percentage (0-100)
 * @param current - Current value
 * @param max - Maximum value
 * @returns Percentage as number
 */
export const getPercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return (current / max) * 100;
};
