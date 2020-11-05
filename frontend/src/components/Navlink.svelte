<a
    href={url}
    on:mouseover={handleLinkHover}
    on:touchstart={handleLinkHover}
    on:click={handleLinkClick}
>
    <slot>
    </slot>
</a>

<script>
    import { createEventDispatcher } from "svelte";

    export let url = "";    

    const dispatch = createEventDispatcher();

    const handleLinkHover = (e) => {
        dispatch("linkhover", {
            url : url
        });
    };

    const handleLinkClick = (e) => {
        dispatch("linkclick", {
            url : url
        });
    };
</script>

<style>
    a
    {
        text-decoration: none;
        color: white;
        font-family:  'Alegreya Sans SC', sans-serif;
        font-size: 2em;
        font-weight: 400;
    }

    a:visited
    {
        color: white;
    }
</style>