<script>
	import './styles.css';
	import Footer from './Footer.svelte';
</script>

<div class="flex min-h-full flex-col">
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
