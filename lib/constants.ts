/**
 * Shared constants used throughout the application
 */

export const EASE = [0.76, 0, 0.24, 1] as const;
export const EASE_VARIANT2 = [0.22, 1, 0.36, 1] as const;

export const SITE_CONFIG = {
  URL: "https://sany4l.dev",
  EMAIL: "soumyadipsanyal2017@gmail.com",
  NAME: "Soumyadip Sanyal",
  TITLE: "Full-Stack Web Developer",
  LOCATION: "Warsaw, Poland",
  COUNTRY: "PL",
  TIMEZONE: "Europe/Warsaw",
  OG_IMAGE: "/og.png",
} as const;

export const EMAIL_CONFIG = {
  FROM: process.env.RESEND_FROM || "Soumyadip Portfolio <onboarding@resend.dev>",
  API_KEY: process.env.RESEND_API_KEY,
} as const;

export const SCROLL_THRESHOLDS = {
  HEADER_SCROLL: 24,
  HERO_PAST: 0.8,
  SECTION_VIEW: 0.75,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
} as const;

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
  DESKTOP: 1240,
} as const;

export const SOCIAL_NETWORKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/Nanashi-101",
    icon: "github",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/ign._.kratos",
    icon: "instagram",
  },
] as const;

export const VALIDATION_RULES = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 500,
  MESSAGE_MAX_LENGTH: 5000,
  MESSAGE_MIN_LENGTH: 10,
} as const;
