<nav class={currentShouldNavTop ? "nav-top" : ""}>
    <header
        use:useStyleProperties={() => ({
            "--opacity": `${$headerOpacity}`
        })}
    >
        <Navlink on:linkhover={handleLinkHover} url="./" selected={!segment}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="100 100 465 534.3105269670394" class="logo">
                <path d="M273.55 609.93C257.09 492.37 260.72 424.15 284.44 405.27C320.02 376.95 372.95 386.37 403.46 414.71C423.8 433.6 428.39 496.49 417.25 603.39C440.17 585.17 454.5 573.79 460.23 569.23C528.08 515.32 564.4 431 556.97 344.66C553.94 309.39 546.35 221.21 534.22 80.11C549.61 293.5 521.51 385.92 449.9 357.37C342.5 314.56 260.49 327.62 205.34 371.89C168.57 401.4 143.15 334.84 129.09 172.2C125.34 273.16 122.99 336.25 122.06 361.49C119.21 437.95 152.43 511.31 211.76 559.61C220 566.32 240.6 583.09 273.55 609.93Z" id="ctUB5IoKq"></path>
            </svg>
        </Navlink>

        {#if !currentShouldNavTop}
            <h1 class="title">
                Fake Artist
            </h1>
        {/if}  
    </header>

    <ul>
        <li
            use:useStyleProperties={() => ({
                "--opacity": `${$drawingOpacity}`,
                "--offset-x": `${$drawingOffsetX}px`
            })}
        >
            <Navlink on:linkhover={handleLinkHover} url="./drawings" selected={segment === "drawings"}>Drawing</Navlink>
        </li>
        <li
            use:useStyleProperties={() => ({
                "--opacity": `${$aboutOpacity}`,
                "--offset-x": `${$aboutOffsetX}px`
            })}
        >
            <Navlink on:linkhover={handleLinkHover} url="./about" selected={segment === "about"}>About</Navlink>
        </li>
        <li
            use:useStyleProperties={() => ({
                "--opacity": `${$contactOpacity}`,
                "--offset-x": `${$contactOffsetX}px`
            })}
        >
            <Navlink on:linkhover={handleLinkHover} url="./contact" selected={segment === "contact"}>Contact</Navlink>
        </li>
    </ul>		
</nav>

<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";

    import Navlink from "components/Navlink.svelte";
    import { animSettings } from "settings";
    import { useMachine } from 'utils/useMachine.js';
    import { useStyleProperties } from 'actions/useStyleProperties';

    export let segment;
    export let shouldNavTop;
    export let handleLinkHover;

    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });

    let currentShouldNavTop = null;

    const tweeningOpt = {
        duration:  animSettings.stepDuration / 2,
        easing: linear
    };
    const maxOffsetX = 50;

    const { send, headerOpacity, drawingOpacity, aboutOpacity, contactOpacity, drawingOffsetX, aboutOffsetX, contactOffsetX } = useMachine({
        id: "navAnimMachine",
        context:
        {
            headerOpacity: tweened(0, {...tweeningOpt, duration: animSettings.stepDuration/4}),
            drawingOpacity: tweened(0, {...tweeningOpt, delay: 1 / 8 * animSettings.stepDuration}),
            aboutOpacity: tweened(0, {...tweeningOpt, delay: 2 / 8 * animSettings.stepDuration}),
            contactOpacity: tweened(0, {...tweeningOpt, delay: 3 / 8 * animSettings.stepDuration}),
            drawingOffsetX: tweened(0, {...tweeningOpt, delay: 1 / 8 * animSettings.stepDuration}),
            aboutOffsetX: tweened(0, {...tweeningOpt, delay: 2 / 8 * animSettings.stepDuration}),
            contactOffsetX: tweened(0, {...tweeningOpt, delay: 3 / 8 * animSettings.stepDuration})
        },
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
    },
    {
        services:
        {
            vanish: (ctx) => {
                ctx.headerOpacity.set(0);
                ctx.drawingOpacity.set(0);
                ctx.aboutOpacity.set(0);
                ctx.contactOpacity.set(0);
                ctx.drawingOffsetX.set(maxOffsetX);
                ctx.aboutOffsetX.set(maxOffsetX);
                ctx.contactOffsetX.set(maxOffsetX);

                return new Promise((res, rej) =>
                {
                    setTimeout(res, animSettings.stepDuration);
                });
            },
            appear: (ctx) => {
                currentShouldNavTop = shouldNavTop;

                ctx.headerOpacity.set(1);
                ctx.drawingOpacity.set(1);
                ctx.aboutOpacity.set(1);
                ctx.contactOpacity.set(1);
                ctx.drawingOffsetX.set(0);
                ctx.aboutOffsetX.set(0);
                return ctx.contactOffsetX.set(0);
            }      
        }
    });

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

        font-size: 1em;
	}

	header
	{
		flex: 0 0 10vw;
		display: inline-flex;
		height: auto;

		flex-wrap: wrap;
		justify-content: flex-end;
		align-content: flex-start;

        opacity: var(--opacity);
	}

    .logo
	{
        display: block;
		width: 1.85em;
        height: auto;

        stroke-width: 20px;
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
        padding: 0 0 3vh 0;
		text-align: right;
		font-size: 1.1em;
		font-weight: 400;
        opacity: var(--opacity);
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

        font-size: 0.8em;
	}

	.nav-top header
	{
		margin-left: 2em;
	}

    .nav-top .logo
    {
		max-width: 7vw;
        height: auto;
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