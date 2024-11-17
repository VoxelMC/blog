// Astro
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Integrations
import expressiveCode from 'astro-expressive-code';
import metaTags from 'astro-meta-tags';
import satori from 'satori-astro';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// Remark Rehype
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkCallout from '@r4ai/remark-callout';
import smartypants from 'remark-smartypants';
import remarkToc from './remark/toc.mjs';
import emoji from 'remark-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import { remarkReadingTime } from './remark/reading-time.mjs';
import remarkFlexibleMarkers from 'remark-flexible-markers';
// import remarkMark from 'remark-mark-plus';
// const remarkMarkD = await import('remark-mark-plus');
// const remarkMark = remarkMarkD.default;
// console.log(remarkMark);

import vercel from '@astrojs/vercel/serverless';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
    themes: ['material-theme-darker', 'rose-pine-moon'],
    styleOverrides: {
        uiFontFamily: 'Rubik',
        codeFontFamily: "'JetBrains Mono'",
        frames: {
            editorTabBarBackground: '#333333',
            // editorActiveTabForeground: "#A682FF",
            editorActiveTabForeground: '#FFFFFF',
            // editorActiveTabIndicatorBottomColor: "#A682FF",
            editorActiveTabIndicatorBottomColor: '#aaaaaa00',
            // editorTabBarBorderColor: "#333333"
            editorTabBarBorderColor: '#A682FF',
        },
        // codeBackground: '#333333'
        borderColor: '#A682FF',
    },
};

// https://astro.build/config
export default defineConfig({
    // output: 'static',
    output: 'hybrid',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    site: 'https://blog.trevfox.dev',
    markdown: {
        smartypants: false,
        remarkPlugins: [
            [
                smartypants,
                {
                    dashes: 'oldschool',
                },
            ],
            [
                remarkToc,
                {
                    ordered: true,
                },
            ],
            remarkCallout,
            emoji,
            remarkReadingTime,
            remarkFlexibleMarkers,
        ],
        rehypePlugins: [
            rehypeHeadingIds,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'append',
                    content: fromHtmlIsomorphic(
                        '<span class="ri-link-m ri-sm anchor-link" style="margin-left: 0.2rem;"></span>'
                    ),
                },
            ],
        ],
    },
    integrations: [
        tailwind({
            nesting: true,
            configFile: './tailwind.config.ts',
        }),
        expressiveCode(astroExpressiveCodeOptions),
        mdx(),
        metaTags(),
        sitemap(),
        satori(),
        keystatic(),
        react(),
    ],
    vite: {
        ssr: { external: ['@resvg/resvg-js'] },
    },
});
