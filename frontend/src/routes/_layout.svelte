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
	import { changeRoute } from "machines/routeMachine.js";

    export function preload(page, session) {
		return new Promise(async (resolve, reject) => {
			const res = await this.fetch(`api/backgrounds`).catch(e => {
				reject(e);
			});
			const datas = await res.json();
			setBackgrounds(datas);
			resolve();
		});
	}
</script>

<script>
	import { onMount } from "svelte";
	import Background from "components/Background.svelte";
	import Navbar from "components/Navbar.svelte";

	onMount(() => {
		changeRoute(window.location.href.match(/^.*\/(.*)$/)[1]);

		window.addEventListener('popstate', e => {
			changeRoute(window.location.href.match(/^.*\/(.*)$/)[1]);
		});
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
		font-size: 1.15em;
	}

	#content
    {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 2em 1.2em 1em 3.5vw;
    }

	@media (min-width: 390px)
    {
        main
        {
            font-size: 1.5em;
        }
	}

	@media (min-width: 960px)
    {
        main
        {
            font-size: 1.8em;
        }
	}

	@media (min-width: 1280px)
    {
        main
        {
            /* font-size: 2.1em; */
			font-weight: 200;
        }
	}
</style>