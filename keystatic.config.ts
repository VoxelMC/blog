// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description' }),
                pubDate: fields.text({ label: 'Date (MMM DD, YYYY)' }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: props => props.value,
                }),
                devOnly: fields.checkbox({
                    label: 'Draft',
                    defaultValue: true,
                    description: 'Is this WIP?',
                }),
                content: fields.mdx({ label: 'Content' }),
            },
        }),
    },
});

// title: 'SynBio and Standardization'
// description:
//     'Synthetic Biology needs standards. What have we done so far, and what can
//     we learn?'
// pubDate: 'Oct 28, 2024'
// tags: ['synbio', 'standards', 'review', 'meta-engineering']
// devOnly: true
