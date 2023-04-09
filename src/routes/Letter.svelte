<script>
	import classNames from 'classnames';

	export let value;
	export let answer;
	export let current;
	export let previous;

	export let selected;

	const exact = answer === 'x';
	const close = answer === 'c';
	const missing = answer === '_';
	const classes = classNames(
		'[--side:16vw] [--half-side:calc(var(--side)/2)] h-[--side] w-[--side] relative uppercase text-[10vw] my-8 mx-2 transform-style-3d',
		{
			'rotate-x-[90deg]': missing,
			'rotate-x-[180deg]': close,
			'rotate-x-[270deg]': exact,
			'animate-spin-x-5': previous
			// 'animate-spin-x-3': close,
			// 'animate-spin-x-2': missing
		}
	);
</script>

<div class={classes}>
	<div class="absolute inset-0 bg-white text-center translate-z-[--half-side]">{value}</div>
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
		{:else if close}
			(present)
		{:else if missing}
			(absent)
		{:else}
			empty
		{/if}
	</span>
	<input name="guess" disabled={!current} type="hidden" {value} />
</div>
