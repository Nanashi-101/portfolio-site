import * as React from 'react';
import { Html, Head, Container, Preview, Section, Hr, Text, Body} from "@react-email/components";
import { Tailwind } from '@react-email/tailwind';


interface EmailTemplateProps {
    message: string;
}


export const EmailTemplateUser = ({
    message
}: EmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>
            New Message from Soumyadip
        </Preview>
        <Tailwind>
            <Body className='bg-gray-100 p-4'>
                <Container>
                    <Section className='bg-white border-black my-10 px-10 py-5 rounded-xl'>
                        <Text className='text-2xl font-bold leading-tight'>
                            Hello! I am Soumyadip Sanyal.
                        </Text>
                        <Hr />
                        <Text className='text-gray-600'>I have received your message:</Text>
                        <Hr />
                        <Container>
                            <Text className='bg-gray-200 px-5 py-3 my-5 border-l-gray-600 border-[10px] rounded-xl'>
                                {`\"${message}\"`}
                            </Text>
                        </Container>

                        <Text className='text-gray-600'>I will get back to you soon!.</Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);