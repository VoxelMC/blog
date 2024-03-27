import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';
import type { ReactNode } from 'react';
import config from '../config';

export async function GET() {
	const fontFile = await fetch(
		'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
	);
	// Make Rubik work later...
	// const fontFile = await fetch(
	// 	'https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFV0U1dYPFkZVO.woff2'
	// );
	const fontData = await fontFile.arrayBuffer();

	return await satoriAstroOG({
		template: html`<div
			class="flex flex-col text-white"
			style="font-family: Rubik; display: flex; height: 100%; width: 100%; align-items: center; justify-content: center; letter-spacing: -0.02em; background-color: #1a1a1a;"
		>
			<div class='left-[22] top-[22] absolute flex items-center text-5xl'><span class='text-[#a682ff]'>blog</span>.trevfox.dev</div>
			<div class='text-8xl max-w-[70%] text-pretty text-center bg-[#a682ff] text-white px-30 py-20'>${config.author}</div>
			<div class='text-6xl max-w-[60%] text-pretty text-center mt-16 leading-normal'>${config.description}</div>
		</div>` as ReactNode,
		width: 1920,
		height: 1080,
	}).toResponse({
		satori: {
			fonts: [
				{
					name: 'Rubik',
					data: fontData,
					style: 'normal',
				},
			],
		},
	});

}
