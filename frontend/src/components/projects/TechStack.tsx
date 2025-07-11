import { Card } from '@/components/ui/card';

function TechStack() {
    const technologies = [
        { name: 'React', icon: '⚛️', color: 'text-blue-400' },
        { name: 'HTML5', icon: '🔴', color: 'text-orange-500' },
        { name: 'CSS3', icon: '🔵', color: 'text-blue-500' },
        { name: 'Bootstrap', icon: '🟣', color: 'text-purple-500' },
        { name: 'Tailwind', icon: '🌊', color: 'text-cyan-400' },
        { name: 'Express', icon: '⚡', color: 'text-gray-300' },
        { name: 'JavaScript', icon: '🟨', color: 'text-yellow-400' },
        { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
        { name: 'MySQL', icon: '🐬', color: 'text-blue-600' },
        { name: 'MongoDB', icon: '🍃', color: 'text-green-400' },
        { name: 'PHP', icon: '🐘', color: 'text-purple-400' },
        { name: 'Laravel', icon: '⚔️', color: 'text-red-500' },
        { name: 'Git', icon: '🔧', color: 'text-orange-400' },
        { name: 'VS Code', icon: '💙', color: 'text-blue-400' },
        { name: 'Docker', icon: '🐋', color: 'text-blue-500' }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto reveal-up">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6">
                {technologies.map((tech, index) => (
                    <Card
                        key={tech.name}
                        className="group relative bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-110 hover:shadow-burgundy/20 hover:shadow-lg cursor-pointer reveal-up"
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <div className="flex flex-col items-center justify-center p-4 h-20">
                            <div className={`text-3xl mb-2 transition-transform duration-300 group-hover:scale-125 ${tech.color}`}>
                                {tech.icon}
                            </div>
                            <span className="text-xs text-cream-300 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {tech.name}
                            </span>
                        </div>

                        {/* Hover effect background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-500/10 to-burgundy-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </Card>
                ))}
            </div>

            <div className="mt-8 text-center reveal-up">
                <p className="text-cream-300 text-lg font-kurye-italic">
                    Technologies I work with to bring ideas to life
                </p>
            </div>
        </div>
    );
}

export default TechStack; 