<main>
	<Background blured={blured}>
		<div id="content">
			<slot>
			</slot>
		</div>
	</Background>
	<Navbar shouldNavTop={shouldNavTop && mobileLayout} handleLinkHover={handleLinkHover} segment={segment}/>
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
	import { onMount } from "svelte";
	import Background from "components/Background.svelte";
	import Navbar from "components/Navbar.svelte";
	import {urlKey} from "stores/background.js";

	export let segment;

	urlKey.set(segment ? segment : "");
	$ : urlKey.set(segment ? segment : "");
	
	let blured = segment ? true : false;
	$ : blured = segment ? true : false;

	let shouldNavTop = segment ? true : false;
	$ : shouldNavTop = segment ? true : false;

	let mobileLayout = true;
	onMount(() => {
		mobileLayout = (window.matchMedia("(min-width: 1280px)").matches) ? false : true;
		window.addEventListener("orientationchange",(e) => { 
			mobileLayout = window.matchMedia("(min-width: 1280px)").matches;
		});
	});

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

	#content
    {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 2em 1.2em 1em 1.2em;
    }
</style>