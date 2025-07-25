import { Card } from '@/components/ui/card';
import { categorizedTechnologies } from '@/data/technologies';

function TechStack() {
    const categories = [
        { key: 'frontend', title: 'Frontend', color: 'text-blue-400' },
        { key: 'backend', title: 'Backend', color: 'text-green-400' },
        { key: 'databases', title: 'Databases', color: 'text-purple-400' },
        { key: 'tools', title: 'Tools', color: 'text-orange-400' }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto reveal-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {categories.map((category, categoryIndex) => (
                    <div key={category.key} className="flex flex-col relative">
                        {categoryIndex < categories.length - 1 && (
                            <div className="absolute top-0 -right-4 w-px h-full bg-gradient-to-b from-burgundy-500/50 to-transparent hidden lg:block"></div>
                        )}

                        <div className="flex items-center mb-6">
                            <h3 className={`text-xl font-semibold ${category.color} mr-4`}>
                                {category.title}
                            </h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-burgundy-500/50 to-transparent lg:hidden"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-4">
                            {categorizedTechnologies[category.key as keyof typeof categorizedTechnologies].map((tech) => (
                                <Card
                                    key={tech.name}
                                    className="group relative bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-110 hover:shadow-burgundy/20 hover:shadow-lg cursor-pointer reveal-up"
                                >
                                    <div className="flex flex-col items-center justify-center p-4 h-20">
                                        <div className="mb-2 transition-transform duration-300 group-hover:scale-125">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="w-8 h-8 object-contain"
                                            />
                                        </div>
                                        <span className="text-xs text-cream-300 text-center font-medium">
                                            {tech.name}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-br from-burgundy-500/10 to-burgundy-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TechStack;