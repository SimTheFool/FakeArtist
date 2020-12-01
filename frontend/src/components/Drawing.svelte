
<div class="drawing" bind:this={original} on:click={handleDrawingClick}>
    <LazyImage src={src} alt="some drawing"/>
</div>

{#if expanded}
<div use:portal={"main"} style="position: absolute">
    <div class="drawing drawing-expanded" bind:this={ref} on:click={handleDrawingClick}>
        <LazyImage src={src} alt="some drawing"/>
    </div>
</div>
{/if}

<script>
    import { tick, onDestroy } from "svelte";

    import LazyImage from "components/LazyImage.svelte";

    import { portal } from "actions/portal.js";
    import { clickDrawing, subscribeOnExpand, subscribeOnShrink } from "machines/drawingMachine.js";

    export let src;
    export let id;

    let expanded = false;
    let original;
    let ref;

    const setRefToBeginStyle = () => {
        let rect = original.getBoundingClientRect();

        ref.style.top = `${rect.y}px`;
        ref.style.left = `${rect.x}px`;
        ref.style.width = `${rect.width}px`;
        ref.style.height = `${rect.height}px`;
    };

    const setRefToEndStyle = () => {
        ref.style.top = "0px";
        ref.style.left = "0px";
        ref.style.width = "100%";
        ref.style.height = "100%";
    };

    const handleDrawingClick = (e) => {
        clickDrawing(id);
    };

    let unsubscribeOnExpand = subscribeOnExpand((state, ctx) => {
        if(ctx.id != id) return;

        expanded = true;
        tick().then(() => {      
            ref.style.transitionDuration = "0s";
            setRefToBeginStyle();

            setTimeout(() => {
                ref.style.transitionDuration = `${ctx.stepDuration - 25}ms`;
                setRefToEndStyle();

                setTimeout(() => {
                    ref.style.backgroundColor="#000B";
                }, ctx.stepDuration - 25)
            }, 25);
        });
    });

    let unsubscribeOnShrink = subscribeOnShrink((state, ctx) => {
        if(ctx.id != id) return;

        ref.style.backgroundColor="#0000";

        setTimeout(() => {
            ref.style.transitionDuration = `${ctx.stepDuration - 120}ms`;
            setRefToBeginStyle();
        }, 100);
        

        setTimeout(() => {
            expanded = false;
        }, ctx.stepDuration);
    });

    onDestroy(() => {
        unsubscribeOnExpand();
        unsubscribeOnShrink();
    });

</script>

<style>
    .drawing
    {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        opacity: 1;
        z-index: 0;

        cursor: pointer;

        transition: filter 1s ease-out, transform 0.2s ease-out;

        filter: grayscale(0.9) contrast(150%) brightness(80%);
    }
    
    .drawing:hover
    {
        transform: scale(1.1);
        filter: grayscale(0.3) contrast(150%) brightness(80%);
    }

    .drawing-expanded
    {
        position: absolute;
        z-index: 4;
        transition-property: top, left, width, height, filter, background-color;
        transition-timing-function: linear;
        font-size: 0;
        transform: scale(1);
        filter: grayscale(0.3) contrast(150%) brightness(80%);
    }

    .drawing-expanded :global(img)
    {
        box-shadow: none;
    }

    .drawing-expanded:hover
    {
        transform: scale(1);
    }
</style>