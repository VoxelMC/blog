type Config = {
    author: string;
    title: string;
    description: string;
    lang: string;
};

export default {
    author: 'Trevor Fox',
    title: 'trevfox.dev',
    description: 'The perspective of a biochemist computer programmer.',
    lang: 'en',
} satisfies Config;
