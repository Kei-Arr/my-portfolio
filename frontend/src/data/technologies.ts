export interface Technology {
    name: string;
    icon: string;
    color?: string;
}

export const technologies: Technology[] = [
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


export const categorizedTechnologies = {
    frontend: technologies.filter(tech => 
        ['React', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind', 'JavaScript'].includes(tech.name)
    ),
    backend: technologies.filter(tech => 
        ['Node.js', 'Express', 'PHP', 'Laravel'].includes(tech.name)
    ),
    databases: technologies.filter(tech => 
        ['MySQL', 'MongoDB'].includes(tech.name)
    ),
    tools: technologies.filter(tech => 
        ['Postman', 'Jira', 'Bitbucket', 'VS Code'].includes(tech.name)
    )
};