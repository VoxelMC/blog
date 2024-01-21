import fs from 'fs';
import path from 'path';
import { getCollection, type CollectionEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';
('sora-latin-500-normal.woff2');

interface Props {
	params: { slug: string };
	props: { post: CollectionEntry<'posts'> };
}

export async function GET({ props }: Props) {
	const { post } = props;

	const SoraReqular = fs.readFileSync(
		path.resolve('./public/fonts/sora-latin-500-normal.ttf')
	);
	const SoraBold = fs.readFileSync(
		path.resolve('./public/fonts/sora-latin-700-normal.ttf')
	);

	let html = {
		type: 'div',
		props: {
			// tw: 'flex h-full w-full items-center justify-center font-bold bg-white',
			style: {
				display: 'flex',
				height: '100%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				letterSpacing: '-.02em',
				fontWeight: 700,
				background: 'white',
			},
			children: [
				{
					type: 'div',
					props: {
						// tw: 'left-[42] top-[42] absolute flex items-center',
						style: {
							left: 42,
							top: 42,
							position: 'absolute',
							display: 'flex',
							alignItems: 'center',
						},
						children: [
							// {
							// 	type: 'svg',
							// 	props: {
							// 		height: '24',
							// 		width: '24',
							// 		id: 'a',
							// 		'data-name': 'Layer 1',
							// 		xmlns: 'http://www.w3.org/2000/svg',
							// 		viewBox: '0 0 836.33 836.33',
							// 		children: [
							// 			{
							// 				type: 'path',
							// 				class: 'b',
							// 				d: 'M694.36,0H141.98C63.57,0,0,63.57,0,141.98v552.38c0,78.41,63.57,141.98,141.98,141.98h552.38c78.41,0,141.98-63.57,141.98-141.98V141.98C836.33,63.57,772.77,0,694.36,0ZM485.65,310.42h-177.23v270.87c0,28.2,7.55,49.86,22.66,64.95,15.09,15.11,36.41,22.66,63.94,22.66h90.64v102.72h-81.58c-44.98,0-82.92-6.05-113.8-18.12-30.88-12.08-54.2-32.89-69.98-62.44-15.78-29.53-23.66-69.48-23.66-119.83v-260.81h-89.62v-87.61h89.62V64.71h111.78v158.09h177.23v87.61ZM729.32,765.57h-136.95v-141.98h136.95v141.98Z',
							// 				children: []
							// 			}
							// 		],
							// 	},
							// },
							{
								type: 'div',
								props: {
									style: {
										marginLeft: 8,
										fontSize: 28,
										fontFamily: 'DM Sans Regular',
									},
									children: 'blog.trevfox.dev',
								},
							},
						],
					},
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							padding: '20px 50px',
							margin: '0 42px',
							fontSize: 52,
							width: 'auto',
							maxWidth: 650,
							textAlign: 'center',
							backgroundColor: '#A682FF',
							color: 'white',
							lineHeight: 1.4,
							fontFamily: 'DM Sans Bold',
						},
						// tw: 'flex flex-wrap justify-center py-[20px] px-[50px] text-[40px] w-auto max-w-[550px] text-center bg-black text-white tracking-[1.4]',
						children: post.data.title,
					},
				},
			],
		},
	};
	return new ImageResponse(html, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'DM Sans Bold',
				data: SoraBold.buffer,
				style: 'normal',
				weight: 700,
			},
			{
				name: 'DM Sans Regular',
				data: SoraReqular.buffer,
				style: 'normal',
				weight: 500,
			},
		],
	});
}

// fonts: [
//   {
//     name: 'DM Sans Bold',
//     data: DmSansBold.buffer,
//     style: 'normal',
//   },
//   {
//     name: 'DM Sans Regular',
//     data: DmSansReqular.buffer,
//     style: 'normal',
//   },
// ],

export async function getStaticPaths() {
	const blogPosts = await getCollection('posts');
	return blogPosts.map(post => ({
		params: { slug: post.slug },
		props: { post },
	}));
}
