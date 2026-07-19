import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Soumyadip Sanyal — available for freelance work and full-time roles. Let's work together.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Soumyadip Sanyal",
    description: "Available for freelance work and full-time roles. Let's work together.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
