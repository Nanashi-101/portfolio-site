import * as React from 'react';
import { Html, Head, Heading, Container, Preview, Section, Hr, Text, Body } from "@react-email/components";
import { Tailwind } from '@react-email/tailwind';


interface EmailTemplateProps {
    firstName: string;
    message: string;
    senderMail: string;
}

export const EmailTemplate = ({
    firstName, message, senderMail
}: EmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>
            New Message from {firstName}
        </Preview>
        <Tailwind>
            <Body className='bg-gray-100 p-4'>
                <Container>
                    <Section className='bg-white border-black my-10 px-10 py-5 rounded-xl'>
                        <Heading className='leading-tight'>
                            You have a new message from your portfolio:
                        </Heading>
                        <Hr />
                        <Text>The  senders mail is: {senderMail} </Text>
                        <Text className='bg-gray-200 px-5 py-3 my-5 border-l-gray-600 border-[10px] rounded-xl'>
                            {`\"${message}\"`}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);