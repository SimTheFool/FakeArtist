{#if isMounted}
    <a
        href={url}
        on:mouseover={handleLinkHover}
        on:touchstart={handleLinkHover}
        on:click={handleLinkClick}
    >
        <slot>
        </slot>
    </a>
{/if}

<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    export let url = "";

    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });

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
        display: inline-block;
    }

    a:visited
    {
        color: currentColor;
    }
</style>