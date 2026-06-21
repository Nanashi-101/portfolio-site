"use server";

import { EmailTemplateMe, EmailTemplateUser } from '@/emails/EmailTemplates';
import { getErrorMessage, validateString } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MY_EMAIL = "soumyadipsanyal2017@gmail.com";
const FROM = process.env.RESEND_FROM || "Soumyadip Portfolio <onboarding@resend.dev>";

export const sendEmail = async (formData: FormData) => {
    const message = formData.get('senderMsg');
    const senderEmail = formData.get('senderEmail');
    const name = formData.get('senderName');

    if (!validateString(message, 5000) || !validateString(senderEmail, 500) || !validateString(name, 100)) {
        return { error: "Invalid form data — please check your inputs." };
    }

    // 1) Notify me with the full details (this must succeed)
    const { error } = await resend.emails.send({
        from: FROM,
        to: MY_EMAIL,
        reply_to: senderEmail as string,
        subject: `New portfolio message from ${name as string}`,
        react: React.createElement(EmailTemplateMe, {
            name: name as string,
            senderMail: senderEmail as string,
            message: message as string,
        }),
    });
    if (error) return { error: getErrorMessage(error) };

    // 2) Auto-response to the sender (best-effort: delivering to arbitrary
    //    addresses requires a verified domain in Resend, so don't fail on this)
    try {
        await resend.emails.send({
            from: FROM,
            to: senderEmail as string,
            reply_to: MY_EMAIL,
            subject: "Thanks for reaching out — Soumyadip Sanyal",
            react: React.createElement(EmailTemplateUser, {
                name: name as string,
                message: message as string,
            }),
        });
    } catch (e) {
        console.warn("Auto-response not sent:", getErrorMessage(e));
    }

    return { data: true };
};
