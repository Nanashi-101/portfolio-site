import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 mt-10 w-full max-w-[1100px] border-t border-ink/10 px-4 pt-8 text-center">
      <small className="mb-3 block text-xs font-semibold text-ink/70">
        &copy; 2026 Soumyadip Sanyal. All rights reserved.
      </small>
      <p className="mx-auto max-w-2xl text-xs leading-relaxed text-ink/50">
        Built with <span className="font-medium text-gold">React &amp; Next.js</span> (App Router &amp; Server Actions),
        <span className="font-medium text-gold"> TypeScript</span>,
        <span className="font-medium text-gold"> Tailwind CSS</span>,
        <span className="font-medium text-gold"> Framer Motion</span>, React Email &amp; Resend, Vercel hosting.
      </p>
    </footer>
  );
}
