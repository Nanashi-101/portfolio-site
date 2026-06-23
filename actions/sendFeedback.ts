"use server";

import { EmailTemplateFeedback } from '@/emails/EmailTemplates';
import { getErrorMessage } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const MY_EMAIL = "soumyadipsanyal2017@gmail.com";
const FROM = process.env.RESEND_FROM || "Soumyadip Portfolio <onboarding@resend.dev>";

export type FeedbackData = {
    overall: number;
    design: number;
    performance: number;
    liked: string;
    suggestion: string;
    name?: string;
    coffee?: boolean;
};

const clampStar = (n: unknown) => {
    const v = Number(n);
    return Number.isFinite(v) ? Math.min(5, Math.max(0, Math.round(v))) : 0;
};

const normalize = (data: Partial<FeedbackData>) => ({
    overall: clampStar(data.overall),
    design: clampStar(data.design),
    performance: clampStar(data.performance),
    liked: String(data.liked ?? "").slice(0, 2000),
    suggestion: String(data.suggestion ?? "").slice(0, 2000),
    name: String(data.name ?? "").slice(0, 120),
    coffee: !!data.coffee,
});

export const sendFeedback = async (data: FeedbackData) => {
    const payload = normalize(data);
    if (!payload.overall) return { error: "Please give at least an overall rating." };

    try {
        const { error } = await resend.emails.send({
            from: FROM,
            to: MY_EMAIL,
            subject: `New feedback — ${payload.overall}/5${payload.coffee ? " ☕" : ""} from your portfolio`,
            react: React.createElement(EmailTemplateFeedback, payload),
        });
        if (error) return { error: getErrorMessage(error) };
    } catch (e) {
        return { error: getErrorMessage(e) };
    }
    return { data: true };
};

// Fired when a visitor taps "Buy me a coffee" — a heads-up with any context they entered.
export const notifyCoffee = async (data: Partial<FeedbackData>) => {
    const payload = { ...normalize(data), coffee: true };
    try {
        await resend.emails.send({
            from: FROM,
            to: MY_EMAIL,
            subject: "☕ Someone clicked Buy me a coffee on your portfolio",
            react: React.createElement(EmailTemplateFeedback, payload),
        });
    } catch (e) {
        return { error: getErrorMessage(e) };
    }
    return { data: true };
};
