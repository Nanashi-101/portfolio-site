"use client";

import React, { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { links } from '@/lib/data'
import type { SectionContextType } from '@/lib/types'



type ActiveSectionContextProviderProps = {
    children: ReactNode
}

type ActiveSectionContextType = {
    activeSection: SectionContextType;
    setActiveSection: React.Dispatch<React.SetStateAction<SectionContextType>>;//This is a rather curated type provided by React as the type of the function returned by useState
    timeLastClick: number;
    setTimeLastClick: React.Dispatch<React.SetStateAction<number>>;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null)

const ActiveSectionProvider = ({ children }: ActiveSectionContextProviderProps) => {
    const [activeSection, setActiveSection] = useState<SectionContextType>("Home")
    const [timeLastClick, setTimeLastClick] = useState<number>(0)// We need to store the time of the last click to prevent the active section from changing when the user clicks on a link to navigate to a section.

    return (
        <ActiveSectionContext.Provider value={{
            activeSection,
            setActiveSection,
            timeLastClick,
            setTimeLastClick
        }}>
            {children}
        </ActiveSectionContext.Provider>
    )
}


// Custom hook to consume the active section context
export function useActiveSection() {
    const context = useContext(ActiveSectionContext)
    if (context === null) {
        throw new Error('useActiveSection must be used within an ActiveSectionProvider')
    }

    return context;
}

export default ActiveSectionProvider
