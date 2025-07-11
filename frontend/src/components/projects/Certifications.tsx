import { Card, CardContent } from '@/components/ui/card';

function Certifications() {
    const certifications = [
        {
            id: 1,
            title: 'React Developer Certification',
            issuer: 'Meta',
            date: '2024',
            icon: '⚛️',
            status: 'Verified',
            description: 'Advanced React concepts, hooks, and state management'
        },
        {
            id: 2,
            title: 'Full Stack Web Development',
            issuer: 'FreeCodeCamp',
            date: '2023',
            icon: '🌐',
            status: 'Completed',
            description: 'Complete web development bootcamp covering frontend and backend'
        },
        {
            id: 3,
            title: 'JavaScript Algorithms',
            issuer: 'HackerRank',
            date: '2023',
            icon: '🧮',
            status: 'Gold',
            description: 'Advanced JavaScript problem solving and algorithms'
        },
        {
            id: 4,
            title: 'Node.js Backend Development',
            issuer: 'Udemy',
            date: '2023',
            icon: '🟢',
            status: 'Certified',
            description: 'Server-side development with Node.js and Express'
        },
        {
            id: 5,
            title: 'Database Design',
            issuer: 'MongoDB University',
            date: '2022',
            icon: '🍃',
            status: 'Certified',
            description: 'NoSQL database design and optimization'
        },
        {
            id: 6,
            title: 'Cloud Computing',
            issuer: 'AWS',
            date: '2024',
            icon: '☁️',
            status: 'In Progress',
            description: 'Cloud infrastructure and deployment strategies'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Verified': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'Gold': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'Completed': case 'Certified': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'In Progress': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto reveal-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <Card
                        key={cert.id}
                        className="group bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-105 hover:shadow-burgundy/20 hover:shadow-lg reveal-up"
                        style={{
                            animationDelay: `${index * 0.15}s`
                        }}
                    >
                        <CardContent className="p-6">
                            {/* Certificate Icon and Status */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-burgundy-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl">{cert.icon}</span>
                                </div>
                                <span className={`${getStatusColor(cert.status)} px-2 py-1 text-xs rounded-full border`}>
                                    {cert.status}
                                </span>
                            </div>

                            {/* Certificate Info */}
                            <h3 className="text-lg font-bold text-cream-50 mb-2 group-hover:text-burgundy-300 transition-colors duration-300">
                                {cert.title}
                            </h3>

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-burgundy-300 font-medium text-sm">
                                    {cert.issuer}
                                </span>
                                <span className="text-cream-400 text-xs">
                                    {cert.date}
                                </span>
                            </div>

                            <p className="text-cream-300 text-xs leading-relaxed font-kurye-italic">
                                {cert.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center reveal-up">
                <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
                    <h3 className="text-2xl font-bold text-cream-50 mb-4 font-kurye-italic">
                        Continuous Learning
                    </h3>
                    <p className="text-cream-300 font-kurye-italic max-w-2xl mx-auto">
                        I believe in staying current with technology trends and continuously expanding my skill set.
                        These certifications represent my commitment to professional growth and expertise in modern web development.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Certifications; 