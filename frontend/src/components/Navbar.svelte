
<nav>
    <ul>
        <li><Navlink backgroundId={1}>Lien 1</Navlink></li>
        <li><Navlink backgroundId={2}>Lien 2</Navlink></li>
        <li><Navlink backgroundId={3}>Lien 3</Navlink></li>
    </ul>
</nav>

<script>
	import Navlink from "components/Navlink.svelte";   
</script>

<style>

    nav
    {
        flex: 0 0 10em;

        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        height: 100%;
        max-width: 5em;

        justify-content: right;
        align-content: flex-end;
        align-items: flex-end;
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
        padding: 0 0.5em 1em 0;
    }
</style>