/**
 * Custom React hooks for the application
 */

import { useInView } from "react-intersection-observer";
import { useActiveSection } from "@/context/active-section-context";
import { useEffect } from "react";
import type { SectionName, UseActiveSectionViewReturn } from "@/lib/types";
import { SCROLL_THRESHOLDS } from "@/lib/constants";

/**
 * Hook to track when a section comes into view and update active section
 * @param sectionName - Name of the section to track
 * @param threshold - Visibility threshold (0-1) before section is considered in view
 * @returns Object with ref to attach to element and inView boolean
 */
export function useActiveSectionView(
  sectionName: SectionName,
  threshold: number = SCROLL_THRESHOLDS.SECTION_VIEW
): UseActiveSectionViewReturn {
  const { ref, inView } = useInView({
    threshold,
  });

  const context = useActiveSection();

  if (!context) {
    throw new Error(
      "useActiveSectionView must be used within ActiveSectionProvider"
    );
  }

  const { setActiveSection, timeLastClick } = context;

  useEffect(() => {
    // Only update active section if user hasn't clicked a nav link recently
    if (inView && Date.now() - timeLastClick > 1000) {
      try {
        setActiveSection(sectionName);
      } catch (error) {
        console.error("Failed to set active section:", error);
      }
    }
  }, [inView, setActiveSection, timeLastClick, sectionName]);

  return { ref, inView };
}
