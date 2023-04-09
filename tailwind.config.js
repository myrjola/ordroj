/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				spinwheel: {
					from: { transform: 'rotateX(0deg)' },
					to: { transform: 'rotateX(calc(1turn + var(--tw-rotate-x)))' }
				}
			}
		}
	},
	plugins: [require('tailwindcss-3d')]
};
