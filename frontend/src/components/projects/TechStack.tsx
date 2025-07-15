import { Card } from '@/components/ui/card';

function TechStack() {
    const technologies = [
        {
            name: 'React',
            icon: 'https://img.icons8.com/office/96/react.png',
            color: 'text-blue-400'
        },
        {
            name: 'HTML5',
            icon: 'https://img.icons8.com/pulsar-gradient/48/html-5.png',
        },
        {
            name: 'CSS3',
            icon: 'https://img.icons8.com/pulsar-gradient/96/css3.png',
            color: 'text-blue-500'
        },
        {
            name: 'Bootstrap',
            icon: 'https://img.icons8.com/office/96/bootstrap.png',
            color: 'text-purple-500'
        },
        {
            name: 'Tailwind',
            icon: 'https://img.icons8.com/color/96/tailwindcss.png',
            color: 'text-cyan-400'
        },
        {
            name: 'Express',
            icon: 'https://img.icons8.com/office/96/express-js.png',
            color: 'text-gray-300'
        },
        {
            name: 'JavaScript',
            icon: 'https://img.icons8.com/color/96/javascript.png',
            color: 'text-yellow-400'
        },
        {
            name: 'Node.js',
            icon: 'https://img.icons8.com/fluency/96/node-js.png',
        },
        {
            name: 'MySQL',
            icon: 'https://img.icons8.com/external-those-icons-lineal-color-those-icons/500/external-MySQL-programming-and-development-those-icons-lineal-color-those-icons.png',
            color: 'text-blue-600'
        },
        {
            name: 'MongoDB',
            icon: 'https://img.icons8.com/color/96/mongo-db.png',
            color: 'text-green-400'
        },
        {
            name: 'PHP',
            icon: 'https://img.icons8.com/officexs/100/php-logo.png',
        },
        {
            name: 'Laravel',
            icon: 'https://img.icons8.com/nolan/100/laravel.png',
            color: 'text-red-500'
        },
        {
            name: 'Postman',
            icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png',
            color: 'text-orange-400'
        },
        {
            name: 'Jira',
            icon: 'https://img.icons8.com/color/96/jira.png',
            color: 'text-blue-400'
        },
        {
            name: 'Bitbucket',
            icon: 'https://img.icons8.com/color/96/bitbucket.png',
            color: 'text-blue-500'
        },
        {
            name: 'VS Code',
            icon: 'https://img.icons8.com/color/96/visual-studio-code-2019.png',
            color: 'text-blue-500'
        }
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

                        {/* Hover effect background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-500/10 to-burgundy-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default TechStack;