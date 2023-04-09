<script>
	import classNames from 'classnames';

	export let value;
	export let answer;
	export let current;
	export let previous;

	export let selected;

	$: exact = answer === 'x';
	$: present = answer === 'c';
	$: missing = answer === '_';
	$: classes = classNames(
		'[--side:min(12vw,80px)] [--half-side:calc(var(--side)/2)] h-[--side] w-[--side] [--tw-spinwheel-offset:90deg] relative uppercase text-[calc(var(--side)*0.7)] mx-2 transform-style-3d',
		{
			'rotate-x-[90deg]': missing,
			'rotate-x-[180deg]': present,
			'rotate-x-[270deg]': exact,
			'animate-[spinwheel_1s_ease_both]': previous
		}
	);
	$: letterClasses = classNames(
		'absolute inset-0 bg-white text-center translate-z-[--half-side] border',
		{
			'bg-blue-100': selected
		}
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
