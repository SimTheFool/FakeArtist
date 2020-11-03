<a
    href={url}
    on:mouseover={handleLinkHover}
    on:touchstart={handleLinkHover}
>
    <slot>
    </slot>
</a>

<script>
    import { id } from 'stores/background.js';
    export let url = "";    
    export let backgroundId;

    function handleLinkHover(e) {
        id.set(backgroundId);
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