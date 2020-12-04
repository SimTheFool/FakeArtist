<div id="about"
    style={`
        --opacity: ${$opacity};
        --color: ${color};
    `}
>

    <ScrollableElement>

        {#each elems as article}

            <h2>{article.title}</h2>
            <p>{article.content}</p>
    
        {/each}

    </ScrollableElement>


</div>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`api/about`);
        const elems = await res.json();
        return {elems};
    }
</script>

<script>
    import { onDestroy } from "svelte";
    import { tweened } from "svelte/motion";

    import ScrollableElement from "components/ScrollableElement.svelte";

    import { subscribeOnVanish } from "machines/styleMachine.js";
    import { subscribeOnExit, subscribeOnEnter } from "machines/routeMachine.js";
    import { backgrounds } from "stores/background.js";

    export let elems;

    let opacity = tweened(0);
    let color = "#ffffff";

    const unsubscribeOnVanish = subscribeOnVanish((state, ctx) => {
        color = backgrounds[ctx.nextKey].color;
    });

    const unsubscribeOnExit = subscribeOnExit((state, ctx) => {
        opacity.set(0, {duration: ctx.stepDuration});
    });

    const unsubscribeOnEnter = subscribeOnEnter((state, ctx) => {
        opacity.set(1, {duration: ctx.stepDuration});
        color = backgrounds[ctx.styleMachine.context.key].color;
    });

    onDestroy(() => {
        unsubscribeOnVanish();
        unsubscribeOnExit();
        unsubscribeOnEnter();
    });
</script>

<style>
    #about
    {
        width: 100%;
        height: 100%;
        opacity: var(--opacity);
        font-family: 'Spartan', sans-serif;
    }

    h2
    {
        text-align: center;
        font-size: 1em;
        margin: 1em 0 0.25em 0;
    }

    h2:first-of-type
    {
        margin-top: 0.5em;
    }

    p
    {
        font-size: 0.65em;
        margin: 0;
        font-weight: 300;
        text-indent: 2em;
    }

    @media (min-width: 1280px)
    {
        #about
        {
            padding: 0 3em;
        }
	}
</style>