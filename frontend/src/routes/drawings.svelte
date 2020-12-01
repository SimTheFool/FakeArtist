<div id="drawings"
    use:useStyleProperties={() => ({
        "--opacity": `${$opacity}`,
        "--color": `${color}`
    })}
>
    <ScrollableElement>
        <div id="drawings-grid">
            {#each elems as drawing, index}
        <Drawing src={drawing.src} id={index}/>
            {/each}
        </div>
    </ScrollableElement>
</div>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`api/drawings`);
        const elems = await res.json();
        return {elems};
    }
</script>

<script>
    import { onDestroy } from "svelte";
    import { tweened } from "svelte/motion";

    import ScrollableElement from "components/ScrollableElement.svelte";
    import Drawing from "components/Drawing.svelte";

    import { useStyleProperties } from "actions/useStyleProperties.js";
    import { subscribeOnVanish } from "machines/styleMachine.js";
    import { subscribeOnExit, subscribeOnEnter } from "machines/routeMachine.js";
    import { backgrounds } from "stores/background.js";

    export let elems;

    const opacity = tweened(0);
    let color = "#ffffff";

    const unsubscribeOnEnter = subscribeOnEnter((state, ctx) => {
        opacity.set(1, {duration: ctx.stepDuration});
        color = backgrounds[ctx.styleMachine.context.key].color;
    });

    const unsubscribeOnExit = subscribeOnExit((state, ctx) => {
        opacity.set(0, {duration: ctx.stepDuration});
    });

    const unsubscribeOnVanish = subscribeOnVanish((state, ctx) => {
        color = backgrounds[ctx.nextKey].color;
    });

    onDestroy(() => {
        unsubscribeOnVanish();
        unsubscribeOnExit();
        unsubscribeOnEnter();
    });


</script>

<style>

    #drawings
    {
        width: 100%;
        height: 100%;
        opacity: var(--opacity);
    }

    #drawings-grid
    {
        position: unset;

        display: grid;
        width: 100%;
        height: 100%;

        grid-template-columns: repeat(2, 30vmin);
        grid-auto-rows: 50vmin;
        grid-auto-flow: row;
        row-gap: 2em;

        padding: 0.3em;

        justify-content: space-around;

        overflow: hidden;
    }
</style>