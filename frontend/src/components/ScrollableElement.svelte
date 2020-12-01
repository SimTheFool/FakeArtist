<div
    class="scrollable-element"
    on:scroll={handleScroll}
    bind:this={scrollableElement}
>
    <div class="scroll scroll-top" class:scroll-hidden={isTop}>
        <span on:click={handleScrollButtonClick.bind(this, "top")}>▵</span>
    </div>

    <div class="content">
        <slot></slot>
    </div>

    <div class="scroll scroll-bottom" class:scroll-hidden={isBottom}>
        <span on:click={handleScrollButtonClick.bind(this, "bottom")}>▿</span>
    </div>
</div>

<script>
    import { onMount } from "svelte";

    let scrollableElement;
    let isBottom = false;
    let isTop = true;

    const handleScroll = ({target}) => {
         isBottom = (target.scrollHeight - target.scrollTop == target.clientHeight);
         isTop = (target.scrollTop == 0);
    };

    const handleScrollButtonClick = (type) => {
        if(!scrollableElement)
        {
            return;
        }

        let y = (type == "top") ? 0 : scrollableElement.scrollHeight;

        scrollableElement.scrollTo({ top: y, left: 0, behavior: 'smooth'});
    };

    onMount(() => {
        handleScroll({target: scrollableElement});
    });
</script>

<style>
    *
    {
        position: unset;
    }

    .scrollable-element
    {
        display: block;
        width: 100%;
        height: 100%;
        overflow: auto;
        scrollbar-width: none;
    }

    .scrollable-element::-webkit-scrollbar
    {
        display: none;
    }

    .scroll
    {
        display: block;
        text-align: end;
        width: 100%;
        font-size: 1.5em;
        font-weight: 900;
        color: var(--color);
        text-shadow: 0px 0px 2px black;

        position: sticky;
        transition: color 0.5s linear;

        pointer-events: none;
    }

    .scroll span
    {
        cursor: pointer;
        pointer-events: auto;
    }

    .scroll-top
    {
        top: 0px;
        z-index:3;
    }

    .scroll-bottom
    {
        bottom: 0px;
    }

    .scroll-hidden
    {
        visibility: hidden;
        pointer-events: none;
    }

    .content
    {
        margin-right: 1.5em;
    }
</style>