// layout: '../../layouts/BlogPost.astro'
// title: 'Hello, World!'
// description:
//     'Who is Trev, what does he do, and why do you care? The answers lie here.'
// pubDate: 'Jan 18 2024'
// tags: ['about-me']

// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
export interface PostFrontmatter {
    layout: string;
    title: string;
    description: string;
    pubDate: string;
    tags: string[];
}
// 2. Define your collection(s)
const postCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        layout: z.string().default('../../layouts/BlogPost.astro'),
        title: z.string(),
        description: z.string(),
        pubDate: z.string(),
        tags: z.array(z.string()),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    posts: postCollection,
};
