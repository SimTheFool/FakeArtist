<main>
	<Background backgroundDatas={$backgroundDatas} blured={blured}>
		<slot></slot>
	</Background>
	<Navbar on:linkhover={handleLinkHover} on:linkclick={handleLinkClick}/>
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
	import Navbar from "components/Navbar.svelte";
	import {urlKey, backgroundsRegistry, backgroundDatas} from "stores/background.js";

	export let backgrounds;
	export let segment;

	backgroundsRegistry.set(backgrounds);
	urlKey.set(segment ? segment : "");

	let blured = segment ? true : false;

	const handleLinkHover = (e) => {
		let linkSegment = e.detail.url.slice(2);
		urlKey.set(linkSegment);
	};

	const handleLinkClick = (e) => {
		let linkSegment = e.detail.url.slice(2);
		urlKey.set(linkSegment);

		blured = linkSegment ? true : false;	
	};
</script>

<style>
 	main
	{
		display: flex;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}
</style>