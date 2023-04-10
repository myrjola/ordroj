<script>
	import classNames from 'classnames';

	export let value = '';
	export let answer = '';
	export let current = false;
	export let previous = false;
	export let selected = false;
	export let loading = false;
	export let badGuess = false;

	$: exact = answer === 'x';
	$: present = answer === 'c';
	$: missing = answer === '_';
	$: classes = classNames(
		'[--side:min(12vw,80px)] [--half-side:calc(var(--side)/2)] h-[--side] w-[--side] relative uppercase text-[calc(var(--side)*0.7)] mx-2 transform-style-3d transition-transform ease-out motion-reduce:transition-none',
		{
			'rotate-x-[calc(1turn+90deg)]': missing,
			'rotate-x-[calc(1turn+180deg)]': present,
			'rotate-x-[calc(1turn+270deg)]': exact
		},
		loading && current ? 'rotate-x-[1turn]' : 'rotate-x-[0deg]',
		badGuess && current ? 'motion-safe:animate-shake rotate-x-[0deg] duration-0' : 'duration-1000'
	);
	$: letterClasses = classNames(
		'absolute inset-0 text-center translate-z-[--half-side] border',
		selected ? 'bg-blue-100' : 'bg-white'
	);
</script>

<div class={classes}>
	<div class={letterClasses}>{value}</div>
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
