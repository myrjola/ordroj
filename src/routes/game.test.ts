import { Game } from './game';
describe('game', () => {
	it('initialises new game when cookie is empty', () => {
		const game = new Game();

		expect(game.guesses).to.have.ordered.members(['', '', '', '', '', '']);
		expect(game.index).to.be.a('number');
		expect(game.answers).to.be.an('array').that.is.empty;
		expect(game.answer).to.be.length(5);
	});

	it('parses cookie', () => {
		const game = new Game(
			'2258-raket macho mager magik magma madam-_x___ xx___ xx___ xx___ xx_cc xxxxx'
		);
		expect(game.guesses).to.have.ordered.members([
			'raket',
			'macho',
			'mager',
			'magik',
			'magma',
			'madam'
		]);
		expect(game.index).to.be.a('number');
		expect(game.answers).to.have.ordered.members([
			'_x___',
			'xx___',
			'xx___',
			'xx___',
			'xx_cc',
			'xxxxx'
		]);
		expect(game.answer).to.be.equal('malis');
	});
});
