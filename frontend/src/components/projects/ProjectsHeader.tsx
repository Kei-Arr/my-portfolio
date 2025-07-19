import { Button } from '@/components/ui/button';
import { CodeBracketIcon, RectangleStackIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface ProjectsHeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

function ProjectsHeader({ activeTab, onTabChange }: ProjectsHeaderProps) {
    const tabs = [
        {
            id: 'tech-stack',
            label: 'Tech Stack',
            icon: <RectangleStackIcon className="w-5 h-5" />,
            mobileLabel: 'Tech'
        },
        {
            id: 'projects',
            label: 'Projects',
            icon: <CodeBracketIcon className="w-5 h-5" />,
            mobileLabel: 'Projects'
        },
        {
            id: 'certifications',
            label: 'Certifications',
            icon: <TrophyIcon className="w-5 h-5" />,
            mobileLabel: 'Certs'
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mb-12 reveal-up">
            {/* Desktop View */}
            <div className="hidden sm:flex items-center justify-center gap-4 bg-dark-800 rounded-2xl p-2">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "destructive"}
                        size="lg"
                        className={`flex-1 min-w-[200px] h-16 text-base font-semibold transition-all duration-300 rounded-xl focus:outline-none focus-visible:ring-0 ${activeTab === tab.id
                            ? 'bg-burgundy-500 text-cream-50 shadow-lg hover:!bg-burgundy-500 hover:!text-cream-50'
                            : 'text-cream-100 hover:text-cream-50 hover:bg-burgundy-500/20'
                            }`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden px-4">
                <div className="flex justify-center">
                    <div className="flex bg-dark-800 rounded-2xl p-1.5 gap-1 w-full max-w-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex flex-col items-center justify-center gap-1 flex-1 h-16 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-burgundy-500 text-cream-50 shadow-lg shadow-burgundy-500/20'
                                    : 'text-cream-300 hover:text-cream-50 hover:bg-burgundy-500/20'
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span className="text-xs font-medium leading-tight">{tab.mobileLabel}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsHeader;