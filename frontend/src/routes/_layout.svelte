<main>
	<Background>
		<div id="content">
			<slot>
			</slot>
		</div>
	</Background>
	<Navbar/>
</main>

<script context="module">
	import {setBackgrounds} from "stores/background.js";

    export async function preload(page, session) {
        const res = await this.fetch(`api/backgrounds`);
		const datas = await res.json();
		setBackgrounds(datas);
        return;
	}
</script>

<script>
	import { onMount } from "svelte";
	import Background from "components/Background.svelte";
	import Navbar from "components/Navbar.svelte";

	export let segment;

	onMount(() => {
		let link = document.querySelector(`#${segment ? segment : "home"}-nav-link`);
		link.click();
	});
</script>

<style>
 	main
	{
		display: flex;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
		color: white;
		font-family:  'Alegreya Sans SC', sans-serif;
		font-size: 1.5em;
	}

	#content
    {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 2em 1.2em 1em 1.2em;
    }
</style>