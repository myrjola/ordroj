<script>
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="flex min-h-full flex-col">
	<main class="relative flex-1 overflow-hidden">
		<slot />
	</main>
	<Footer />
</div>
