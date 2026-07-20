/**
 * Validation utilities for form data and user inputs
 */

import { VALIDATION_RULES } from "./constants";

/**
 * Validates a string value against length constraints
 * @param value - The value to validate
 * @param maxlength - Maximum allowed string length
 * @returns True if valid, false otherwise
 */
export const validateString = (value: unknown, maxlength: number = 500): boolean => {
  if (!value || typeof value !== "string" || value.length > maxlength) {
    return false;
  }
  return true;
};

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= VALIDATION_RULES.EMAIL_MAX_LENGTH;
};

/**
 * Validates contact form data
 * @param name - Sender's name
 * @param email - Sender's email
 * @param message - Message content
 * @returns Validation result with any errors
 */
export const validateContactForm = (
  name: string,
  email: string,
  message: string
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate name
  if (!validateString(name, VALIDATION_RULES.NAME_MAX_LENGTH)) {
    errors.name = `Name is required and must be under ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`;
  }

  // Validate email
  if (!validateEmail(email)) {
    errors.email = "Please provide a valid email address";
  }

  // Validate message
  if (!validateString(message, VALIDATION_RULES.MESSAGE_MAX_LENGTH)) {
    errors.message = `Message must be under ${VALIDATION_RULES.MESSAGE_MAX_LENGTH} characters`;
  } else if (message.length < VALIDATION_RULES.MESSAGE_MIN_LENGTH) {
    errors.message = `Message must be at least ${VALIDATION_RULES.MESSAGE_MIN_LENGTH} characters`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Sanitizes string input to prevent XSS attacks
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};
