"use server";
import { EmailTemplateUser } from '@/emails/EmailTemplates';
import { getErrorMessage, validateString } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
const resend = new Resend(key);

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

    let data;
    try {
        await resend.emails.send(
            {
                from: 'Sam <onboarding@resend.dev>',
                to: mail as string,
                subject: `Hello! ${name}, I have received your message!`,
                reply_to: mail as string,
                react: React.createElement(EmailTemplateUser, {
                    message: message as string,
                }),
            }
        );
        document
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
    
    return {
        data,
    }
};

// [
//     {
//         from: 'Sam <onboarding@resend.dev>',
//         to: ["soumyadipsanyal2017@gmail.com"],
//         subject: `Message from: \"${name}\" via portfolio`,
//         reply_to: mail as string,
//         react: React.createElement(EmailTemplateMe, {
//             message: message as string,
//             senderMail: mail as string,
//             firstName: name as string
//         }),
//     },
//     {
//         from: 'Sam <onboarding@resend.dev>',
//         to: [mail as string],
//         subject: `Hello ${name}, I have received your message!`,
//         reply_to: "soumyadipsanyal2017@gmail.com",
//         react: React.createElement(EmailTemplateUser, {
//             message: message as string,
//             senderMail: mail as string,
//             firstName: name as string
//         })
//     }
// ]