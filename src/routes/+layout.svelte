<script>
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="min-h-full flex flex-col">
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
