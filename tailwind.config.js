import { transform } from 'tailwindcss-3d/types/css-utilities/transform.js';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				shake: {
					'0%': { transform: 'translateX(0rem)' },
					'20%': { transform: 'translateX(2rem)' },
					'40%': { transform: 'translateX(-2rem)' },
					'60%': { transform: 'translateX(1rem)' },
					'80%': { transform: 'translateX(-1rem)' },
					'100%': { transform: 'translateX(0rem)' }
				}
			},
			animation: {
				shake: 'shake 300ms ease'
			}
		}
	},
	plugins: [require('tailwindcss-3d')]
};
