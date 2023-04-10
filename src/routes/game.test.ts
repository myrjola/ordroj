import { Game } from './game';
describe('game', () => {
	it('initialises new game when cookie is empty', () => {
		const game = new Game();

		expect(game.guesses).to.have.ordered.members([
			'     ',
			'     ',
			'     ',
			'     ',
			'     ',
			'     '
		]);
		expect(game.index).to.be.a('number');
		expect(game.answers).to.be.an('array').that.is.empty;
		expect(game.answer).to.be.length(5);
		expect(game.position).to.equal(0);
	});

	it('parses cookie', () => {
		const game = new Game('@0-2022-start;polen;kölad;kölna; ; -__c__;__x_c;xxxc_;xxxxx-0');
		expect(game.version).to.equal(0);
		expect(game.guesses).to.have.ordered.members(['start', 'polen', 'kölad', 'kölna', ' ', ' ']);
		expect(game.index).to.be.a('number');
		expect(game.answers).to.have.ordered.members(['__c__', '__x_c', 'xxxc_', 'xxxxx']);
		expect(game.answer).to.equal('kölna');
		expect(game.position).to.equal(0);
	});

	it('does not accept invalid version', () => {
		expect(() => new Game('2022-start;polen;kölad;kölna; ; -__c__;__x_c;xxxc_;xxxxx-0')).toThrow();
	});
});
