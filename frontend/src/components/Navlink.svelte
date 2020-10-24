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
    }

    a:visited
    {
        color: white;
    }
</style>