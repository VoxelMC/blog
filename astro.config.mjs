import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import smartypants from 'remark-smartypants';
import remarkToc from 'remark-toc';
import emoji from 'remark-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import expressiveCode from 'astro-expressive-code';
import metaTags from 'astro-meta-tags';
import satori from 'satori-astro';
import vtbot from 'astro-vtbot';

// import tailwindConfigViewer from 'astro-tailwind-config-viewer';

import vercel from '@astrojs/vercel/static';

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
	output: 'static',
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
		expressiveCode(astroExpressiveCodeOptions),
		mdx(),
		// tailwindConfigViewer({
		// 	configFile: './tailwind.config.ts',
		// 	overlayMode: 'embed',
		// }),
		metaTags(),
		sitemap(),
		satori(),
		vtbot(),
	],
});
