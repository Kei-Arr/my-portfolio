import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

function ProjectsContent() {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: '🛒',
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
            technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
            image: '📋',
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            id: 3,
            title: 'Weather Dashboard',
            description: 'A responsive weather application with location-based forecasts, interactive maps, and historical weather data visualization.',
            technologies: ['JavaScript', 'Chart.js', 'Weather API', 'CSS3'],
            image: '🌤️',
            demoUrl: '#',
            githubUrl: '#'
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto reveal-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <Card
                        key={project.id}
                        className="group bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-105 hover:shadow-burgundy/20 hover:shadow-xl reveal-up"
                        style={{
                            animationDelay: `${index * 0.2}s`
                        }}
                    >
                        <CardContent className="p-6">
                            {/* Project Icon/Image */}
                            <div className="flex items-center justify-center w-16 h-16 bg-burgundy-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">{project.image}</span>
                            </div>

                            {/* Project Info */}
                            <h3 className="text-xl font-bold text-cream-50 mb-3 group-hover:text-burgundy-300 transition-colors duration-300">
                                {project.title}
                            </h3>

                            <p className="text-cream-300 text-sm leading-relaxed mb-4 font-kurye-italic">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-burgundy-500/20 text-burgundy-300 text-xs rounded-full border border-burgundy-500/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    size="sm"
                                    className="flex-1 bg-burgundy-500 hover:bg-burgundy-600 text-cream-50"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Demo
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-burgundy-500/50 text-burgundy-300 hover:bg-burgundy-500/20"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    Code
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center reveal-up">
                <Button
                    size="lg"
                    variant="outline"
                    className="border-burgundy-500/50 text-burgundy-300 hover:bg-burgundy-500/20 px-8"
                >
                    View All Projects
                </Button>
            </div>
        </div>
    );
}

export default ProjectsContent; 