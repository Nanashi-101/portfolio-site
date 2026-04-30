// Not exactly needed but as I am learning typescript I decided to go with the tutorial as it is necessary to know how to write typescript code professionally.

import React, { Children } from 'react'

interface HeadingProps {
    children: React.ReactNode
}

const SectionHeading = ({ children }: HeadingProps) => {
    return (
        <div className="flex flex-col items-center mb-16">
            <h2 className='text-3xl sm:text-4xl font-bold capitalize text-gray-900 dark:text-white mb-4'>{children}</h2>
            <div className="w-12 h-1.5 bg-primary-500 rounded-full" />
        </div>
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
