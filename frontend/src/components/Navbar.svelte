<nav class={(shouldNavTop && mobileLayout) ? "nav-top" : ""}>
    <header style={`--opacity: ${$headerOpacity}`}>
        <Navlink url="">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="100 100 465 534.3105269670394" class="logo">
                <path d="M273.55 609.93C257.09 492.37 260.72 424.15 284.44 405.27C320.02 376.95 372.95 386.37 403.46 414.71C423.8 433.6 428.39 496.49 417.25 603.39C440.17 585.17 454.5 573.79 460.23 569.23C528.08 515.32 564.4 431 556.97 344.66C553.94 309.39 546.35 221.21 534.22 80.11C549.61 293.5 521.51 385.92 449.9 357.37C342.5 314.56 260.49 327.62 205.34 371.89C168.57 401.4 143.15 334.84 129.09 172.2C125.34 273.16 122.99 336.25 122.06 361.49C119.21 437.95 152.43 511.31 211.76 559.61C220 566.32 240.6 583.09 273.55 609.93Z" id="ctUB5IoKq"></path>
            </svg>
        </Navlink>

        {#if !shouldNavTop}
            <h1 class="title">
                Fake Artist
            </h1>
        {/if}  
    </header>

    <ul>
        <li style={`
            --opacity: ${$drawingOpacity};
            --offset-x: ${$drawingOffsetX}px;
        `}>
            <Navlink url="drawings">Drawing</Navlink>
        </li>
        <li style={`
            --opacity: ${$aboutOpacity};
            --offset-x: ${$aboutOffsetX}px;
        `}>
            <Navlink url="about">About</Navlink>
        </li>
        <li style={`
            --opacity: ${$contactOpacity};
            --offset-x: ${$contactOffsetX}px;
        `}>
            <Navlink url="contact">Contact</Navlink>
        </li>
    </ul>		
</nav>

<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";

    import Navlink from "components/Navlink.svelte";

    import { subscribeOnExit, subscribeOnEnter } from "machines/routeMachine.js";

    let shouldNavTop = false;
    let mobileLayout = true;

	onMount(() => {
		mobileLayout = (window.matchMedia("(min-width: 1280px)").matches) ? false : true;
		window.addEventListener("orientationchange",(e) => { 
			mobileLayout = window.matchMedia("(min-width: 1280px)").matches;
		});
	});

    const headerOpacity =tweened(0);
    const drawingOpacity = tweened(0);
    const drawingOffsetX = tweened(16);
    const aboutOpacity = tweened(0);
    const aboutOffsetX = tweened(16);
    const contactOpacity = tweened(0);
    const contactOffsetX = tweened(16);

    const transitNavBar = (opacity, offsetX, stepDuration) => {

        let tweeningOpt = { duration: stepDuration * 2 / 3, easing: linear};
        headerOpacity.set(opacity, tweeningOpt);
        
        let delay = stepDuration * 1 / 9;
        drawingOpacity.set(opacity, {...tweeningOpt, delay});
        drawingOffsetX.set(offsetX, {...tweeningOpt, delay});

        delay = stepDuration * 2 / 9;
        aboutOpacity.set(opacity, {...tweeningOpt, delay});
        aboutOffsetX.set(offsetX, {...tweeningOpt, delay});

        delay = stepDuration * 3 / 9;
        contactOpacity.set(opacity, {...tweeningOpt, delay});
        contactOffsetX.set(offsetX, {...tweeningOpt, delay});
    };

    subscribeOnExit((state, ctx) => {
        let newShouldNavTop = ctx.nextUrl ? true : false;
        if(newShouldNavTop != shouldNavTop)
        {
            transitNavBar(0, 16, ctx.stepDuration);
        }
    });

    subscribeOnEnter((state, ctx) => {
        shouldNavTop = ctx.url ? true : false;
        transitNavBar(1, 0, ctx.stepDuration);
    });

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