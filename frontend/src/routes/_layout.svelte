<main>
	<Background backgrounds={backgrounds}/>
	<slot></slot>
</main>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`api/backgrounds`);
		const backgrounds = await res.json();
        return {backgrounds};
	}
</script>

<script>
	import Background from "components/Background.svelte";
	export let backgrounds;
</script>

<style>
 	main
	{
		width: 100vw;
		height: 100vh;	
	}
</style>