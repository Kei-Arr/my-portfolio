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
            {categories.map((category, categoryIndex) => (
                <div key={category.key} className="mb-12">
                  
                    <div className="flex items-center mb-6">
                        <h3 className={`text-xl font-semibold ${category.color} mr-4`}>
                            {category.title}
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-burgundy-500/50 to-transparent"></div>
                    </div>

               
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categorizedTechnologies[category.key as keyof typeof categorizedTechnologies].map((tech, index) => (
                            <Card
                                key={tech.name}
                                className="group relative bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-110 hover:shadow-burgundy/20 hover:shadow-lg cursor-pointer reveal-up"
                                style={{
                                    animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s`
                                }}
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
    );
}

export default TechStack;