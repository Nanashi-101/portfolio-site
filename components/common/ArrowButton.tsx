"use client";

import { FiArrowUpRight } from "react-icons/fi";

/**
 * Signature button: pill with the label + a gold arrow-circle.
 * On hover the pill floods gold, the circle inverts and the arrow rotates.
 * `tone="dark"` = for permanently dark backgrounds (footer, side menu).
 */
export default function ArrowButton({
    children,
    tone = "light",
    size = "md",
    loading = false,
    className = "",
    ...rest
}: {
    children: React.ReactNode;
    tone?: "light" | "dark";
    size?: "md" | "lg";
    loading?: boolean;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const toneCls =
        tone === "dark"
            ? "border-white/25 text-white"
            : "border-ink/25 text-ink";
    const sizeCls =
        size === "lg"
            ? "gap-4 py-3 pl-8 pr-3 text-base"
            : "gap-3 py-2 pl-6 pr-2 text-sm";
    const iconCls = size === "lg" ? "h-12 w-12 text-xl" : "h-9 w-9 text-base";

    return (
        <button
            disabled={loading || rest.disabled}
            {...rest}
            className={`group inline-flex items-center rounded-full border font-semibold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#141414] disabled:opacity-60 ${toneCls} ${sizeCls} ${className}`}
        >
            <span>{children}</span>
            <span
                className={`grid place-items-center rounded-full bg-gold text-[#141414] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#141414] group-hover:text-gold ${iconCls}`}
            >
                {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#141414]/30 border-t-[#141414]" />
                ) : (
                    <FiArrowUpRight />
                )}
            </span>
        </button>
    );
}
