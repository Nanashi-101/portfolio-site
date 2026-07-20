/**
 * Reusable SocialLinks component for displaying social media links
 */

import { SOCIAL_NETWORKS } from "@/lib/constants";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import type { IconType } from "react-icons";

const IconMap: Record<string, IconType> = {
  linkedin: BsLinkedin,
  github: BsGithub,
  instagram: BsInstagram,
};

interface SocialLinksProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show text labels next to icons */
  showLabels?: boolean;
  /** Size of icons in pixels */
  iconSize?: number;
  /** Text color class */
  textColorClass?: string;
  /** Hover color class */
  hoverColorClass?: string;
}

/**
 * Renders a list of social media links
 * @param props - Component props
 */
export function SocialLinks({
  className = "",
  showLabels = false,
  iconSize = 16,
  textColorClass = "text-white/70",
  hoverColorClass = "hover:text-gold",
}: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-5 ${className}`}>
      {SOCIAL_NETWORKS.map(({ name, url, icon }) => {
        const Icon = IconMap[icon] || BsGithub;

        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name}`}
            className={`flex items-center gap-2 text-sm ${textColorClass} transition-colors ${hoverColorClass}`}
          >
            <Icon size={iconSize} aria-hidden="true" />
            {showLabels && <span>{name}</span>}
          </a>
        );
      })}
    </div>
  );
}
