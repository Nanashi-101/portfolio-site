// Not exactly needed but as I am learning typescript I decided to go with the tutorial as it is necessary to know how to write typescript code professionally.

import React, { Children } from 'react'

interface HeadingProps {
    children: React.ReactNode
}

const SectionHeading = ({ children }: HeadingProps) => {
    return (
        <h2 className='text-3xl font-medium capitalize mb-8 text-center'>{children}</h2>
    )
}


const AboutHeading = ({children}: HeadingProps) => {
    return (
        <h2 className='text-3xl font-medium capitalize mb-8 text-left'>{children}</h2>
    )
}


export {
    SectionHeading,
    AboutHeading
}
