import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Rentupeers from '../../assets/images/Rentupeers.png';
import Studeospaces from '../../assets/images/studeospaces.png';
import GenSpace from '../../assets/images/GenSpace.png';
import Balancer from 'react-wrap-balancer';

function ProjectsContent() {
    const projects = [
        {
            id: 1,
            title: 'Rentupeers Platform',
            role: 'Full Stack Developer',
            description: 'A peer-to-peer rental platform to address challenges in accessing educational resources through short-term rentals.  It includes features such as rental/buy-sell, Stripe payment, real-time messaging, and transaction tracking. ',
            technologies: ['React', 'Tailwind', 'Node.js', 'MySQL', 'Stripe', 'Socket.io'],
            image: Rentupeers,
            demoUrl: 'https://rentupeers.shop/',
        },
        {
            id: 2,
            title: 'Studeospaces',
            role: 'Backend Developer',
            description: 'A web application that includes real-time desk/room availability checking, automated booking management, integrated payment processing, direct email communication, and administrative monitoring tools.',
            technologies: ['React', 'Laravel', 'Tailwind','PHP', 'MySQL', 'Paymongo', 'Socket.io'],
            image: Studeospaces,
            demoUrl: 'https://studeospaces.vercel.app/',
        },
        {
            id: 3,
            title: 'GenSpace',
            role: 'Full Stack Developer',
            description: 'A web-based system that simplifies room booking and meeting scheduling by allowing companies to manage spaces and employees to reserve them easily.',
            technologies: ['React', 'Vite', 'Tailwind', 'Express', 'MongoDb','Firebase'],
            image: GenSpace,
            demoUrl: 'https://genspace.createelevatehub.com/',
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto reveal-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <Card
                        key={project.id}
                        className="group bg-dark-800 border-dark-700 hover:border-burgundy-500/50 transition-all duration-300 hover:scale-105 hover:shadow-burgundy/20 hover:shadow-xl reveal-up h-full"
                        style={{
                            animationDelay: `${index * 0.2}s`
                        }}
                    >
                        <CardContent className="p-6 flex flex-col h-full">
                            {/* Project Preview Image */}
                            <div className="w-120 h-48 bg-gradient-to-br from-burgundy-500/20 to-dark-800 relative overflow-hidden rounded-lg mb-4">
                                {(typeof project.image === 'string' && (project.image.startsWith('http') || project.image.includes('/'))) ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-6xl opacity-50">{project.image}</span>
                                    </div>
                                )}
                            </div>

                            {/* Project Info */}
                            <h3 className="text-xl font-kurye text-cream-300 mb-3 group-hover:text-burgundy-300 transition-colors duration-300">
                                {project.title} | <span className="text-xs font-sans text-burgundy-500">{project.role}</span>
                            </h3>

                            <p className="text-cream-50 text-sm leading-relaxed mb-6 font-sans">
                                <Balancer>
                                    {project.description}
                                </Balancer>
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-burgundy-500/20 text-cream-50 text-xs rounded-full border border-burgundy-500/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-auto">
                                <Button
                                    size="sm"
                                    className="bg-burgundy-500 hover:bg-burgundy-600 text-cream-50"
                                    asChild
                                >
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Live Demo
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 reveal-up">
                <Button
                    size="lg"
                    variant="see-more"
                    className="px-8"
                >
                    See More
                    <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

export default ProjectsContent;