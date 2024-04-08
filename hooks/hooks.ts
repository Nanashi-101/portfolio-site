import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '@/context/active-section-context';
import { useEffect } from 'react';
import type { SectionContextType } from '@/lib/types'



export function useActiveSectionView(sectionName: SectionContextType, threshold = 0.75) {
    const { ref, inView } = useInView({
        threshold: 0.75,
    });

    const { setActiveSection, timeLastClick } = useActiveSection();

    useEffect(() => {
        if (inView && Date.now() - timeLastClick > 1000) {
            setActiveSection(sectionName);
        }
    }, [inView, setActiveSection, timeLastClick, sectionName]);

    return ref;
}