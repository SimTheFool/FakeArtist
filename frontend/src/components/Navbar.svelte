<nav class={currentShouldNavTop ? "nav-top" : ""}
    use:useStyleProperties={() => ({
        "--text-opacity" : $textOpacity,
        "--offset-x": `${$offsetX}px`
    })}
>
    <header>
        <Navlink on:linkhover={handleLinkHover} url="./">
            <img class="logo" src="logo.svg" alt="logo Fake Artist">
        </Navlink>

        {#if !currentShouldNavTop}
            <h1 class="title">
                Fake Artist
            </h1>
        {/if}  
    </header>

    <ul>
        <li><Navlink on:linkhover={handleLinkHover} url="./drawings">Drawing</Navlink></li>
        <li><Navlink on:linkhover={handleLinkHover} url="./about">About</Navlink></li>
        <li><Navlink on:linkhover={handleLinkHover} url="./contact">Contact</Navlink></li>
    </ul>		
</nav>

<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";

    import Navlink from "components/Navlink.svelte";
    import { animSettings } from "settings";
    import { createMachine } from 'xstate';
    import { useMachine } from 'utils/useMachine.js';
    import { useStyleProperties } from 'actions/useStyleProperties';

    export let shouldNavTop;
    export let handleLinkHover;

    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });

    const tweeningOpt = {
        duration:  animSettings.stepDuration,
        easing: linear
    };

    const textOpacity = tweened(0, tweeningOpt);
    const offsetX = tweened(0, tweeningOpt);

    const navAnimMachine = createMachine({
        id: "navAnimMachine",
        initial: "idle",
        states:
        {
            idle:
            {
                on: { LAYOUT_CHANGE: "vanish" }
            },
            vanish:
            {
                invoke:
                {
                    src: "vanish",
                    onDone: { target : "appear"}
                }
            },
            appear:
            {
                invoke:
                {
                    src: "appear",
                    onDone: { target : "idle"}
                }
            }
        }
    },{
        services:
        {
            vanish: (ctx) => {
                offsetX.set(50);
                textOpacity.set(0);

                return new Promise((res, rej) =>
                {
                    setTimeout(res, animSettings.stepDuration);
                });
            },
            appear: (ctx) => {
                currentShouldNavTop = shouldNavTop;
                offsetX.set(0);
                return textOpacity.set(1);
            }      
        }
    });

    const { send } = useMachine(navAnimMachine);

    let currentShouldNavTop = null;

    $ : if(currentShouldNavTop != shouldNavTop && isMounted)
    {
        send("LAYOUT_CHANGE");
    }

</script>

<style>

    nav
    {
        flex-grow: 0;
        flex-shrink: 0;

		position: absolute;
		
		display: flex;

		right: 0;
        bottom: 0;
        height: 100%;
		width: 17%;
		
		flex-wrap: wrap;
        justify-content: flex-end;
		align-content: space-around;    
		
		padding: 0 1em 0 1em;
	}

	header
	{
		flex: 0 0 10vw;
		display: inline-flex;
		height: auto;

		flex-wrap: wrap;
		justify-content: flex-end;
		align-content: flex-start;
	}

    .logo
	{
		max-width: 10vw;
        height: auto;
	}

	.title
	{
		display: inline-block;
		text-align: right;
		word-spacing: 100vw;
		line-height: 0.7em;
		margin: 0;
		font-weight: 400;
		font-size: 1.4em;
	}

    ul
    {
		flex: 1 1 auto;
        display: flex;

        justify-content: left;
        align-content: space-around;
        flex-wrap: wrap;

        list-style: none;
        margin: 0;
        padding: 0;
    }

    li
    {
        flex: 0 0 100%;
        white-space: nowrap;
        padding: 0 0 1.5vh 0;
		text-align: right;
		font-size: 1.1em;
		font-weight: 400;
        opacity: var(--text-opacity);
        transform: translateX(var(--offset-x));
	}

	.nav-top
	{
		top: 0;
		left: 0;
		right: 0;
		bottom: unset;
		height: auto;
		width: 100%;

		flex-direction: row-reverse;
		flex-wrap: nowrap;
        justify-content: space-between;
		align-content: flex-start;
	}

	.nav-top header
	{
		margin-left: 2em;
	}

	.nav-top ul
	{
		justify-content: space-between;
		align-items: center;
		align-content: center;
		flex-wrap: nowrap;

	}

	.nav-top li
	{
		flex: 0 0 auto;
		padding: 0;
		text-align: center;
	}
	
	@media (min-width: 1280px)
    {
        nav
        {
            position: relative;
            background-color: black;
            width: 30%;
            padding-right: 10%;
        }
	}

</style>