"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from '../lib/data'
import { useActiveSectionView } from '@/hooks/hooks';

const Experience = () => {
    const {ref, inView} = useActiveSectionView("Experience",0.2);
    return (
        <section className='scroll-mt-[7.5rem] sm:scroll-mt-[10.5rem]' ref={ref} id="experience">
            <SectionHeading>my experience</SectionHeading>
            <VerticalTimeline lineColor="">
                {
                    experiencesData.map((item, index) => (
                        <React.Fragment key={index}>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ 
                                    background: '#f3f4f6',
                                    boxShadow: 'none',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    textAlign: 'left',
                                    padding: '1.3rem 1.2rem',

                                }}
                                contentArrowStyle={{ 
                                    borderRight: '0.3rem solid #9ca3af' 
                                }}
                                date={item.date}
                                icon={item.icon}
                                iconStyle={{ 
                                    background: 'white', 
                                    fontSize: '1.5rem',
                                    border: '1px solid rgba(0, 0, 0, 0.29)',
                                }}
                             visible={inView}
                             intersectionObserverProps={{
                                threshold: 0.1
                             }}
                             >
                                <h3 className="capitalize font-semibold">{item.title}</h3>
                                <p className="font-normal !mt-0">{item.location}</p>
                                <p className="!mt-1 !font-normal text-gray-700">{item.description}</p>
                            </VerticalTimelineElement>
                        </React.Fragment>
                    ))
                }
            </VerticalTimeline>
        </section>
    )
}

export default Experience
