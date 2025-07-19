import { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectsHeader, TechStack, ProjectsContent, Certifications } from '.';

function MyProjects() {
    const [activeTab, setActiveTab] = useState('tech-stack');

    const renderContent = () => {
        switch (activeTab) {
            case 'tech-stack':
                return <TechStack />;
            case 'projects':
                return <ProjectsContent />;
            case 'certifications':
                return <Certifications />;
            default:
                return <TechStack />;
        }
    };

    useEffect(() => {
        // Small delay 
        const timer = setTimeout(() => {
            // Refresh ScrollTrigger to account for new content
            ScrollTrigger.refresh();

            const elements = gsap.utils.toArray('.reveal-up') as Element[];

            elements.forEach((element, index) => {
                // Set initial state
                gsap.set(element, {
                    opacity: 0,
                    y: 30,
                    visibility: 'hidden'
                });

                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: '-150 bottom',
                        end: 'bottom 60%',
                        scrub: true,
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    visibility: 'visible',
                    duration: 1.5,
                    delay: index * 0.05,
                    ease: 'power2.out'
                });
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <section id="projects" className="min-h-screen w-full relative overflow-hidden bg-dark-900 flex items-center justify-center py-20">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Section Title */}
                    <div className="text-center mb-16 reveal-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-burgundy-500 mb-4 font-kurye-italic">
                            My Work
                        </h2>
                        <p className="text-cream-300 text-lg font-kurye-italic max-w-2xl mx-auto">
                            Explore my technical skills, projects, and professional achievements
                        </p>
                    </div>


                    <ProjectsHeader activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="w-full">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyProjects;