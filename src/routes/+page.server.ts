import { fail } from '@sveltejs/kit';
import { Game } from './game';
import type { PageServerLoad, Actions } from './$types';

const cookieName = 'ordroj';

export const load = (({ cookies }) => {
	const game = new Game(cookies.get(cookieName));

	return {
		/**
		 * The player's guessed words so far
		 */
		guesses: game.guesses,

		/**
		 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
		 * an exact match, and 'c' means a close match (right letter, wrong place)
		 */
		answers: game.answers,

		/**
		 * The cursor position
		 */
		position: game.position,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answer: game.answers.length >= 6 ? game.answer : null
	};
}) satisfies PageServerLoad;

export const actions = {
	/**
	 * Modify game state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({ request, cookies }) => {
		const game = new Game(cookies.get(cookieName));

		const data = await request.formData();
		const key = data.get('key');

		const position = parseInt(key?.toString() ?? '');

		const i = game.answers.length;

		if (key === 'backspace') {
			const newGuess = game.guesses[i].split('');
			newGuess[game.position - 1] = ' ';
			game.guesses[i] = newGuess.join('');
			game.position -= 1;
		} else if (position >= 0) {
			game.position = position;
		} else {
			const newGuess = game.guesses[i].split('');
			newGuess[game.position] = key?.toString() ?? ' ';
			game.guesses[i] = newGuess.join('');
			game.position += 1;
		}

		cookies.set(cookieName, game.toString());
	},

	/**
	 * Modify game state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({ request, cookies }) => {
		const game = new Game(cookies.get(cookieName));

		const data = await request.formData();
		const guess = data.getAll('guess') as string[];

		if (!game.enter(guess)) {
			return fail(400, { badGuess: true });
		}

		cookies.set(cookieName, game.toString());
	},

	restart: async ({ cookies }) => {
		cookies.delete(cookieName);
	}
} satisfies Actions;
