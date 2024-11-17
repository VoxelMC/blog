import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rubik', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
                ptmono: ['"PT Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // lightModeBg: '#E6E6E6', // Default
                lightModeBg: '#FAF5FF', // Lavender Whip
                // lightModeBg: '#FEF5EA', // Creame
                darkModeBg: '#1A1A1A',
                accentColor: '#A682FF',
                accentColorLight: '#daccff',
                lightModeText: 'hsl(0deg, 0%, 26%)',
                darkModeText: 'white',
                darkCodeBg: '#333333',
                lightCodeBg: '#CCCCCC',
            },
            screens: {
                handheld: { max: '1024px' },
                gthandheld: { min: '1025px' },
                w500: { max: '600px' },
                w400: { max: '400px' },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            typography: (theme: any) => ({
                // default: {
                // 	css: {
                // 		'code::before': {
                // 			// display: 'none',
                // 		},
                // 		'code::after': {
                // 			// display: 'none',
                // 		},
                // 	},
                // },
                lightMode: {
                    css: {
                        '--tw-prose-kbd': theme('colors.lightModeText'),
                        '--tw-prose-quote-borders': theme(
                            'colors.lightModeText'
                        ),
                        '--tw-prose-bullets': theme('colors.lightModeText'),
                        '--tw-prose-code': theme('colors.lightModeText'),
                    },
                },
                darkMode: {
                    css: {
                        '--tw-prose-kbd': theme('colors.darkModeText'),
                        '--tw-prose-quote-borders': theme(
                            'colors.darkModeText'
                        ),
                        '--tw-prose-bullets': theme('colors.darkModeText'),
                        '--tw-prose-code': theme('colors.darkModeText'),
                    },
                },
            }),
        },
    },
    darkMode: 'class',
    plugins: [typography, scrollbar],
} satisfies Config;
