import * as React from 'react';
import { Html, Head, Container, Preview, Section, Hr, Text, Img, Body } from "@react-email/components";
import { Tailwind } from '@react-email/tailwind';

interface UserProps { message: string; name?: string; }
interface MeProps { name: string; senderMail: string; message: string; }

const SITE = "https://sany4l.dev";
const LOGO = `${SITE}/logo.png`;
const OG = `${SITE}/og.png`;

const Brand = () => (
    <Section className='mb-2'>
        <table cellPadding={0} cellSpacing={0} role="presentation">
            <tr>
                <td style={{ paddingRight: 12 }}>
                    <Img src={LOGO} width="44" height="44" alt="Soumyadip Sanyal" style={{ borderRadius: 10 }} />
                </td>
                <td>
                    <Text className='m-0 text-base font-bold text-gray-900'>Soumyadip Sanyal</Text>
                    <Text className='m-0 text-xs text-gray-500'>Full-stack web developer</Text>
                </td>
            </tr>
        </table>
    </Section>
);

// Auto-response sent to the person who contacted me
export const EmailTemplateUser = ({ message, name }: UserProps) => (
    <Html>
        <Head />
        <Preview>Thanks for reaching out — Soumyadip Sanyal</Preview>
        <Tailwind>
            <Body className='bg-gray-100 p-4'>
                <Container>
                    <Section className='my-10 overflow-hidden rounded-xl bg-white'>
                        <Img src={OG} width="600" alt="Soumyadip Sanyal — Web Developer" className='w-full' />
                        <Section className='px-10 py-6'>
                            <Brand />
                            <Hr />
                            <Text className='text-2xl font-bold leading-tight text-gray-900'>
                                Hey {name || "there"}, thanks for reaching out! 👋
                            </Text>
                            <Text className='text-gray-700'>
                                This is an automated note to let you know I&apos;ve received your message and
                                will personally get back to you as soon as I can — usually within a day or two.
                            </Text>
                            <Text className='text-gray-700'>Here&apos;s a copy of what you sent:</Text>
                            <Text className='my-4 rounded-xl border-l-[6px] border-l-gray-400 bg-gray-100 px-5 py-3 text-gray-800'>
                                {`"${message}"`}
                            </Text>
                            <Text className='text-gray-700'>Talk soon,</Text>
                            <Text className='font-bold text-gray-900'>Soumyadip Sanyal</Text>
                            <Hr />
                            <Text className='text-xs text-gray-400'>Full-stack web developer · Warsaw, Poland · sany4l.dev</Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

// Detailed notification sent to me
export const EmailTemplateMe = ({ name, senderMail, message }: MeProps) => (
    <Html>
        <Head />
        <Preview>New portfolio message from {name}</Preview>
        <Tailwind>
            <Body className='bg-gray-100 p-4'>
                <Container>
                    <Section className='my-10 rounded-xl bg-white px-10 py-6'>
                        <Brand />
                        <Hr />
                        <Text className='text-2xl font-bold leading-tight text-gray-900'>
                            📬 New message from your portfolio
                        </Text>
                        <Text className='text-gray-700'><span className='font-bold'>Name:</span> {name}</Text>
                        <Text className='text-gray-700'><span className='font-bold'>Email:</span> {senderMail}</Text>
                        <Hr />
                        <Text className='font-bold text-gray-900'>Message</Text>
                        <Text className='my-4 rounded-xl border-l-[6px] border-l-gray-400 bg-gray-100 px-5 py-3 text-gray-800'>
                            {`"${message}"`}
                        </Text>
                        <Text className='text-xs text-gray-400'>Reply directly to this email to respond to {name}.</Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);
