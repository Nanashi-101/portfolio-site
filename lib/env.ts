/**
 * Environment variable validation and management
 */

const requiredEnvVars = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const;

const optionalEnvVars = {
  RESEND_FROM: process.env.RESEND_FROM,
  NODE_ENV: process.env.NODE_ENV,
} as const;

/**
 * Validates that all required environment variables are set
 * Throws an error if any are missing
 * @returns Object containing validated environment variables
 */
export const validateEnv = () => {
  const missing: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
        `Please check your .env.local file.`
    );
  }

  return requiredEnvVars;
};

/**
 * Returns environment variables with fallbacks
 */
export const getEnvVars = () => ({
  ...validateEnv(),
  ...optionalEnvVars,
});

/**
 * Checks if the application is in development mode
 */
export const isDevelopment = () => process.env.NODE_ENV === "development";

/**
 * Checks if the application is in production mode
 */
export const isProduction = () => process.env.NODE_ENV === "production";
