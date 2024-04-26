"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from '../lib/data'
import { useActiveSectionView } from '@/hooks/hooks';
import { useThemeContext } from '@/context/theme-context';

const Experience = () => {
    const { ref, inView } = useActiveSectionView("Experience", 0.2);
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        if (inView) {
            setVisible(true);
        }
    }, [inView]);
    const { theme } = useThemeContext();
    return (

        <section className='max-w-[1240px] my-20 scroll-mt-[7.5rem] sm:scroll-mt-[10.5rem]' ref={ref} id="experience">
            <SectionHeading>my experience</SectionHeading>
            <VerticalTimeline lineColor="">
                {
                    experiencesData.map((item, index) => (
                        <React.Fragment key={index}>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{
                                    background: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.05)',
                                    boxShadow: 'none',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    textAlign: 'left',
                                    padding: '1.3rem 1.2rem',

                                }}
                                contentArrowStyle={{
                                    borderRight: theme === 'light' ? '0.3rem solid #9ca3af' : '0.3rem solid rgba(255, 255, 255, 0.873)',
                                }}
                                date={item.date}
                                icon={item.icon}
                                iconStyle={{
                                    background: theme === 'light' ? '#f3f4f6' : '#000',
                                    fontSize: '1.5rem',
                                    border: '1px solid rgba(0, 0, 0, 0.29)',
                                }}
                                visible={visible}
                                intersectionObserverProps={{
                                    threshold: 0.1
                                }}
                            >
                                <h3 className="capitalize font-semibold">{item.title}</h3>
                                <p className="font-normal !mt-0">{item.location}</p>
                                <p className="!mt-1 !font-normal text-gray-700 dark:text-gray-300/60">{item.description}</p>
                            </VerticalTimelineElement>
                        </React.Fragment>
                    ))
                }
            </VerticalTimeline>
        </section>
    )
}

export default Experience
