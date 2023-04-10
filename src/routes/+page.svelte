<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reduced_motion } from './reduced-motion';
	import classNames from 'classnames';
	import Letter from './Letter.svelte';
	import { CornerDownLeft, Delete } from 'lucide-svelte';

	export let data: PageData;

	export let form: ActionData;

	let loading = false;

	/** Whether or not the user has won */
	$: won = data.answers.at(-1) === 'xxxxx';

	/** The index of the current guess */
	$: i = won ? -1 : data.answers.length;

	/** Whether the current guess can be submitted */
	$: submittable = data.guesses[i]?.length === 5;

	$: badGuess = form?.badGuess;

	let scrollContainer: HTMLElement;
	let scrollOffsetElement: HTMLElement;

	$: if (scrollContainer && scrollOffsetElement) {
		const styles = window.getComputedStyle(scrollOffsetElement);
		const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
		const rowOffset = scrollOffsetElement.offsetHeight + margin;
		const offset = rowOffset * (i + 1) - scrollContainer.offsetHeight;
		scrollContainer.scroll({
			top: offset,
			behavior: 'smooth'
		});
	}

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let letterClassNames: Record<string, string>;

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description: Record<string, string>;

	$: {
		letterClassNames = {};
		description = {};

		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					letterClassNames[letter] = 'bg-green-400 hover:brightness-110';
					description[letter] = 'korrekt';
				} else if (!letterClassNames[letter]) {
					letterClassNames[letter] =
						answer[i] === 'c'
							? 'bg-yellow-400 hover:brightness-110'
							: 'bg-red-400 hover:brightness-110';
					description[letter] = answer[i] === 'c' ? 'fel ställe' : 'fel bokstav';
				}
			}
		});
	}

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		const guess = data.guesses[i];
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');
		if (key === 'backspace') {
			data.guesses[i] = guess.slice(0, -1);
			if (form?.badGuess) form.badGuess = false;
		} else if (guess.length < 5) {
			data.guesses[i] += key;
		}
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
	}
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
	<title>Ordröj</title>
	<meta name="description" content="Kan du klura ut ordet?" />
</svelte:head>

<h1 class="sr-only">Ordröj</h1>

<form
	class="flex h-full flex-col"
	method="POST"
	action="?/enter"
	use:enhance={() => {
		loading = true;
		// prevent default callback from resetting the form
		return ({ update }) => {
			loading = false;
			update({ reset: false });
		};
	}}
>
	<div
		bind:this={scrollContainer}
		class="mx-auto flex max-w-lg flex-shrink flex-col overflow-y-auto"
	>
		{#each Array(6) as _, row}
			{@const current = row === i}
			<h2 class="sr-only">Row {row + 1}</h2>
			<div
				bind:this={scrollOffsetElement}
				class="mx-2 my-[min(4vw,24px)] flex transform-style-3d [perspective:1000px]"
			>
				{#each Array(5) as _, column}
					{@const answer = data.answers[row]?.[column]}
					{@const value = data.guesses[row]?.[column] ?? ''}
					{@const selected = current && column === data.guesses[row].length}
					<Letter {answer} {value} {selected} {current} {badGuess} />
				{/each}
			</div>
		{/each}
	</div>

	<div class="align-center mx-auto flex w-full max-w-2xl flex-col">
		<div class="min-h-[calc(2.25rem+2rem)]">
			{#if badGuess}
				<p class="my-4 text-center text-lg text-red-600 sm:text-3xl">
					"{data.guesses[i]}" är inte med på ordlistan.
				</p>
			{/if}
		</div>
		{#if won || data.answers.length >= 6}
			{#if !won && data.answer}
				<p class="my-8 text-center text-3xl">Rätta ordet var "{data.answer}"</p>
			{/if}
			<button
				class="m-8 border bg-white p-8 text-xl shadow hover:bg-gray-100"
				data-key="enter"
				formaction="?/restart"
			>
				{won ? 'Du vann 🎉' : `Du förlorade 💀`} spela igen??
			</button>
		{:else}
			<div>
				<div class="mx-2 mb-8 mt-4 grid grid-cols-11 gap-1">
					{#each 'qwertyuiopåasdfghjklöäzxcvbnm' as letter}
						<button
							on:click|preventDefault={update}
							data-key={letter}
							class={classNames(
								'border uppercase shadow [aspect-ratio:1/1]',
								letterClassNames[letter] ?? 'bg-white hover:bg-gray-100'
							)}
							disabled={data.guesses[i].length === 5}
							formaction="?/update"
							name="key"
							value={letter}
							aria-label="{letter} {description[letter] || ''}"
						>
							{letter}
						</button>
					{/each}

					<button
						class="col-start-8 col-end-10 flex items-center justify-center border bg-white shadow shadow hover:bg-gray-100 disabled:opacity-25"
						data-key="enter"
						disabled={!submittable}
					>
						<span class="sr-only">Mata in</span>
						<CornerDownLeft class="pointer-events-none" size="16" />
					</button>

					<button
						class="col-start-10 col-end-12 flex items-center justify-center border bg-white shadow hover:bg-gray-100"
						on:click|preventDefault={update}
						data-key="backspace"
						formaction="?/update"
						name="key"
						value="backspace"
					>
						<span class="sr-only">Rensa</span>
						<Delete class="pointer-events-none" size="16" />
					</button>
				</div>
			</div>
		{/if}
	</div>
</form>

{#if won}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			particleCount: $reduced_motion ? 0 : undefined,
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	/>
{/if}
