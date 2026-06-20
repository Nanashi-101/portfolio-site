"use client";

import React, { useEffect, useState } from 'react';
import { SectionHeading } from './section-heading';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from '../lib/data';
import { useActiveSectionView } from '@/hooks/hooks';
import { useThemeContext } from '@/context/theme-context';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
    const { ref } = useActiveSectionView("Experience", 0.3);
    const { theme } = useThemeContext();
    const dark = theme === 'dark';

    // Reliable visibility trigger (the library's own scroll detection
    // doesn't fire under Lenis smooth scroll, so we drive it ourselves).
    const { ref: timelineRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (inView) setVisible(true);
    }, [inView]);

    return (
        <section className="w-full max-w-[1240px] scroll-mt-28 px-4" ref={ref} id="experience">
            <SectionHeading index="03" kicker="journey">experience</SectionHeading>
            <div ref={timelineRef}>
                <VerticalTimeline lineColor={dark ? 'rgba(255,255,255,0.12)' : 'rgba(28,28,28,0.12)'}>
                    {experiencesData.map((item, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            visible={visible}
                            intersectionObserverProps={{ threshold: 0.05 }}
                            contentStyle={{
                                background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
                                backdropFilter: 'blur(4px)',
                                boxShadow: 'none',
                                border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(28,28,28,0.10)',
                                textAlign: 'left',
                                padding: '1.4rem 1.5rem',
                                borderRadius: '1rem',
                            }}
                            contentArrowStyle={{ borderRight: '0.4rem solid rgba(208,160,58,0.6)' }}
                            date={item.date}
                            icon={item.icon}
                            iconStyle={{
                                background: dark ? '#e2ba5c' : '#d0a03a',
                                color: '#fff',
                                boxShadow: `0 0 0 4px ${dark ? '#111110' : '#e1dfdd'}, 0 2px 8px rgba(0,0,0,0.18)`,
                            }}
                        >
                            <h3 className="text-lg font-bold capitalize tracking-tight text-ink">{item.title}</h3>
                            <p className="!mt-0 text-sm font-medium text-gold">{item.location}</p>
                            <p className="!mt-2 !font-normal text-sm leading-relaxed text-ink/65">{item.description}</p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </section>
    );
};

export default Experience;
