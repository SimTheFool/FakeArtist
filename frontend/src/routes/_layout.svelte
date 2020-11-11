<main>
	<Background blured={blured}>
		<slot></slot>
	</Background>
	<Navbar navTop={navTop} handleLinkHover={handleLinkHover}/>
</main>

<script context="module">
	import {backgroundsRegistry} from "stores/background.js";

    export async function preload(page, session) {
        const res = await this.fetch(`api/backgrounds`);
		const backgrounds = await res.json();
		backgroundsRegistry.set(backgrounds);
        return;
	}
</script>

<script>
	import Background from "components/Background.svelte";
	import Navbar from "components/Navbar.svelte";
	import {urlKey} from "stores/background.js";

	export let segment;

	urlKey.set(segment ? segment : "");
	$ : urlKey.set(segment ? segment : "");
	
	let blured = segment ? true : false;
	$ : blured = segment ? true : false;

	let navTop = segment ? true : false;
	$ : navTop = segment ? true : false;

	const handleLinkHover = (e) => {
		let linkSegment = e.detail.url.slice(2);
		urlKey.set(linkSegment);
	};
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
</style>