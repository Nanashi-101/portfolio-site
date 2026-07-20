"use server";

/**
 * Server action for handling email submissions from the contact form
 */

import { EmailTemplateMe, EmailTemplateUser } from "@/emails/EmailTemplates";
import { getErrorMessage } from "@/lib/utils";
import { validateContactForm } from "@/lib/validation";
import { SITE_CONFIG, EMAIL_CONFIG } from "@/lib/constants";
import type { EmailResult } from "@/lib/types";
import React from "react";
import { Resend } from "resend";

// Validate environment variables
const apiKey = EMAIL_CONFIG.API_KEY;
if (!apiKey) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(apiKey);

/**
 * Sends email from contact form to site owner and auto-responds to sender
 * @param formData - Form data containing sender info and message
 * @returns Result object with success or error
 */
export const sendEmail = async (formData: FormData): Promise<EmailResult> => {
  try {
    const message = formData.get("senderMsg");
    const senderEmail = formData.get("senderEmail");
    const senderName = formData.get("senderName");

    // Validate form data
    const validation = validateContactForm(
      String(senderName || ""),
      String(senderEmail || ""),
      String(message || "")
    );

    if (!validation.valid) {
      const errorMessages = Object.values(validation.errors).join(" | ");
      return { error: errorMessages };
    }

    // Send notification email to site owner
    const { error: ownerEmailError } = await resend.emails.send({
      from: EMAIL_CONFIG.FROM,
      to: SITE_CONFIG.EMAIL,
      reply_to: String(senderEmail),
      subject: `New portfolio message from ${senderName}`,
      react: React.createElement(EmailTemplateMe, {
        name: String(senderName),
        senderMail: String(senderEmail),
        message: String(message),
      }),
    });

    if (ownerEmailError) {
      console.error("Failed to send email to owner:", ownerEmailError);
      return { error: getErrorMessage(ownerEmailError) };
    }

    // Send auto-response to sender (best-effort)
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.FROM,
        to: String(senderEmail),
        reply_to: SITE_CONFIG.EMAIL,
        subject: `Thanks for reaching out — ${SITE_CONFIG.NAME}`,
        react: React.createElement(EmailTemplateUser, {
          name: String(senderName),
          message: String(message),
        }),
      });
    } catch (autoResponseError) {
      // Don't fail if auto-response fails, but log it
      console.warn(
        "Auto-response email failed (non-critical):",
        getErrorMessage(autoResponseError)
      );
    }

    return { data: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      error: "Failed to send email. Please try again later.",
    };
  }
};
