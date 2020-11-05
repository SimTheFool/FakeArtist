
<nav>
    <ul>
        <li><Navlink on:linkhover on:linkclick url="./">Home</Navlink></li>
        <li><Navlink on:linkhover on:linkclick url="./drawings">Drawing</Navlink></li>
        <li><Navlink on:linkhover on:linkclick url="./about">About</Navlink></li>
        <li><Navlink on:linkhover on:linkclick url="./contact">Contact</Navlink></li>
    </ul>
</nav>

<script>
	import Navlink from "components/Navlink.svelte";   
</script>

<style>

    nav
    {
        flex-grow: 0;
        flex-shrink: 0;

        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        height: 100%;
        width: 17%;

        justify-content: right;
        align-content: flex-end;
        align-items: flex-end;

        padding-bottom: 3em;
        padding-right: 7%;
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

    ul
    {
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
        padding: 0 0 1em 0;
        text-align: right;
    }
</style>