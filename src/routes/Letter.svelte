<script lang="ts">
	import classNames from 'classnames';

	export let value: string;
	export let answer: string;
	export let current: boolean;
	export let selected: boolean;
	export let badGuess: boolean | undefined;
	export let column: number;
	export let update: (e: MouseEvent) => void;

	$: exact = answer === 'x';
	$: present = answer === 'c';
	$: missing = answer === '_';
	$: classes = classNames(
		'[--side:min(12vw,80px)] [--half-side:calc(var(--side)/2)] h-[--side] w-[--side] rotate-x-[0deg] relative uppercase text-[calc(var(--side)*0.7)] mx-2 transform-style-3d transition-transform ease-in-out motion-reduce:transition-none duration-1000',
		{
			'rotate-x-[calc(1turn+90deg)]': missing,
			'rotate-x-[calc(1turn+180deg)]': present,
			'rotate-x-[calc(1turn+270deg)]': exact,
			'motion-safe:animate-shake': badGuess && current
		}
	);
	$: letterClasses = classNames(
		// Firefox workaround https://stackoverflow.com/a/7271936
		'uppercase absolute inset-0 text-center translate-z-[--half-side] border [min-width:-moz-available]',
		selected ? 'bg-blue-100' : 'bg-white'
	);
</script>

<div class={classes}>
	<button
		on:click|preventDefault={update}
		data-key={column}
		formaction="?/update"
		name="key"
		value={column}
		disabled={!current}
		class={letterClasses}>{value}</button
	>
	<div
		aria-hidden="true"
		class="absolute inset-0 bg-green-400 text-center transform-style-3d -translate-y-[--half-side] rotate-x-[90deg]"
	>
		{value}
	</div>
	<div
		aria-hidden="true"
		class="absolute inset-0 bg-red-400 text-center transform-style-3d translate-y-[--half-side] rotate-x-[-90deg]"
	>
		{value}
	</div>
	<div
		aria-hidden="true"
		class="absolute inset-0 bg-yellow-400 text-center transform-style-3d -translate-z-[--half-side] rotate-x-[180deg]"
	>
		{value}
	</div>
	<div
		class="absolute inset-0 bg-gray-200 text-center transform-style-3d -translate-x-[--half-side] rotate-y-[90deg]"
	/>
	<div
		class="absolute inset-0 bg-gray-200 text-center transform-style-3d translate-x-[--half-side] rotate-y-[90deg]"
	/>
	<span class="sr-only">
		{#if exact}
			(correct)
		{:else if present}
			(present)
		{:else if missing}
			(absent)
		{:else}
			empty
		{/if}
	</span>
	<input name="guess" disabled={!current} type="hidden" {value} />
</div>

<style>
</style>
