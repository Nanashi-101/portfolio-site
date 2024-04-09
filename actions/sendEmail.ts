"use server";
import { EmailTemplate } from '@/emails/EmailTemplate';
import { validateString, getErrorMessage } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
    const message = formData.get('senderMsg');
    const mail = formData.get('senderEmail');
    const name = formData.get('senderName');

    if (!validateString(message, 5000) && !validateString(mail, 500) && !validateString(name)) {
        return {
            status: 400,
            message: "Invalid data"
        };
    }

    try {
        await resend.emails.send(
            {
                from: 'Sam <onboarding@resend.dev>',
                to: ["soumyadipsanyal2017@gmail.com"],
                subject: `Message from: \"${name}\" via portfolio`,
                reply_to: mail as string,
                react: React.createElement(EmailTemplate, {
                    message: message as string,
                    senderMail: mail as string,
                    firstName: name as string
                }),
            }
        );
        document
    } catch (error) {
        getErrorMessage(error);
    }
};

// {
//     from: 'Sam <onboarding@resend.dev>',
//     to: ["soumyadipsanyal2017@gmail.com"],
//     subject: `Message from portfolio by: ${name}`,
//     reply_to: mail as string,
//     react: EmailTemplate({ firstName: name as string, message: message as string }) as any,
// },
// {
//     from: 'Sam <onboarding@resend.dev>',
//     to:  mail as string,
//     subject: `Message from portfolio by: ${name}`,
//     reply_to: 'soumyadipsanyal2017@gmail.com',
//     react: EmailTemplate({ firstName: name as string, message: message as string }) as any,
// }