/**
 * TypeScript type definitions for the application
 */

import { links, navLinks, projectsData, experiencesData, skillsData } from "./data";

// Section and navigation types
export type SectionName = typeof links[number]["name"];
export type NavLink = typeof navLinks[number];

// Data types
export type Project = typeof projectsData[number];
export type Experience = typeof experiencesData[number];
export type Skill = typeof skillsData[number];

// Form types
export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  senderMsg: string;
}

export interface ContactFormErrors {
  senderName?: string;
  senderEmail?: string;
  senderMsg?: string;
}

// API response types
export interface EmailResponse {
  data?: boolean;
  error?: string | { message: string };
}

export interface EmailResult {
  error?: string;
  data?: boolean;
}

// Context types
export type ThemeType = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface ActiveSectionContextType {
  activeSection: SectionName | null;
  setActiveSection: (section: SectionName) => void;
  timeLastClick: number;
  setTimeLastClick: (time: number) => void;
}

// Hook return types
export interface UseActiveSectionViewReturn {
  /** Callback ref from react-intersection-observer — attach to the section element */
  ref: (node?: Element | null) => void;
  inView: boolean;
}

// Component props types
export interface SocialLink {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size: number }>;
}

export interface NavLinkItem {
  name: string;
  href: string;
}
