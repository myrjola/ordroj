<script>
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="h-full">
	<main class="relative h-full overflow-hidden bg-slate-50">
		<slot />
	</main>
	<Footer />
</div>
