import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import config from '../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (await getCollection('posts')).filter(post => !post.data.devOnly);

	return rss({
		title: config.title,
		description: config.description,
		site: context.site?.toString() as string,
		items: posts.map(({data, slug}) => ({
			title: data.title,
			pubDate: new Date(new Date(data.pubDate)),
			description: data.description,
			// customData: data.tags.join(", "),
			link: `/posts/${slug}`
		})),
		stylesheet: '/rss/styles.xsl'
	});
}
