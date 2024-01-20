import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import smartypants from 'remark-smartypants';
import remarkToc from 'remark-toc';
import emoji from 'remark-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import expressiveCode from 'astro-expressive-code';
import metaTags from 'astro-meta-tags';
// import tailwindConfigViewer from 'astro-tailwind-config-viewer';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		}
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
			remarkToc,
			emoji,
		],
		rehypePlugins: [
			rehypeHeadingIds,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'append',
					content: fromHtmlIsomorphic(
						'<span class="ri-link-m ri-sm anchor-link" style="margin-left: 0.4rem;"></span>'
					),
				},
			],
		],
	},
	integrations: [
		tailwind({
			configFile: './tailwind.config.ts',
		}),
		expressiveCode(),
		mdx(),
		// tailwindConfigViewer({
		// 	configFile: './tailwind.config.ts',
		// 	overlayMode: 'embed',
		// }),
		metaTags(),
	],
});
