<nav class={navTop ? "nav-top" : ""}>
    <header>
        <div class="logo-placeholder">
            <div class="logo">
                <Navlink on:linkhover={handleLinkHover} url="./">
                    <img src="logo.svg" alt="logo Fake Artist">
                </Navlink>
            </div>
        </div>
        
        <h1 class="title">
            Fake Artist
        </h1>
    </header>

    <ul>
        <li><Navlink on:linkhover={handleLinkHover} url="./drawings">Drawing</Navlink></li>
        <li><Navlink on:linkhover={handleLinkHover} url="./about">About</Navlink></li>
        <li><Navlink on:linkhover={handleLinkHover} url="./contact">Contact</Navlink></li>
    </ul>		
</nav>

<script>
    import Navlink from "components/Navlink.svelte";

    export let navTop;
    export let handleLinkHover;
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
		display: inline-block;
		position: absolute;
        bottom: 0;
        right: 0;
	}

    .logo  img
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

	.nav-top .logo
	{
		max-width: 7vw;
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