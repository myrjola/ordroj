<script>
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="flex h-full flex-col">
	<main class="relative flex-1 overflow-hidden bg-slate-50">
		<slot />
	</main>
	<Footer />
</div>
