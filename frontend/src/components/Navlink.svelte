    <a
        id={`${url ? url : "home"}-nav-link`}
        rel=prefetch
        href={`./${url}`}
        on:mouseover={handleLinkHover}
        on:touchstart={handleLinkHover}
        on:mouseleave={handleLinkLeave}
        on:click|preventDefault={handleLinkClick}
        class:selected={selected}
        use:useStyleProperties={() => ({
            "--color": `${selectedColor}`,
        })}
    >
        <slot>
        </slot>
    </a>

<script>
    import { goto } from '@sapper/app';

    import { useStyleProperties } from 'actions/useStyleProperties';
    import { backgrounds } from "stores/background.js";
    import { changeRoute, subscribeOnExit, subscribeOnEnter } from "machines/routeMachine.js";
    import { changeStyle, subscribeOnVanish, subscribeOnAppear } from "machines/styleMachine.js";

    export let url = "";

    let selected = false;
    let selectedColor = "#ffffff";
    
    let linkHoverProcess = null;
    const linkHoverTreshold = 200;

    const handleLinkHover = (e) => {
        linkHoverProcess = setTimeout(() => {
            changeStyle(url);
        }, linkHoverTreshold);
    };

    const handleLinkLeave = (e) => {
        clearTimeout(linkHoverProcess);
    };

    const handleLinkClick = (e) => {
        changeRoute(url);

        let unsubscribeOnEnter = subscribeOnEnter(() => {
            goto(`./${url}`);
            selected = true;
            unsubscribeOnEnter();
        });
    };

    let unsubscribeOnVanish = null;

    subscribeOnExit((state, ctx) => {
        selected = false;
        let unsubscribeOnVanish = subscribeOnVanish((state, ctx) => {
            selectedColor = backgrounds[ctx.nextKey].color;
        });
    });

    subscribeOnAppear((state, ctx) => {
        selectedColor = backgrounds[ctx.key].color;
        if(unsubscribeOnVanish != null)
        {
            unsubscribeOnVanish();
        }
    });
</script>

<style>
    a
    {
        text-decoration: none;
        display: inline-block;
        color: white;
        stroke: white;
        transition: color 0.5s ease-out, stroke 0.5s ease-out, transform 0.5s ease-out;
    }

    a:visited
    {
        color:white;
        stroke: white;
    }

    a:hover
    {
        transform: scale(0.9);
    }

    .selected
    {
        color: var(--color);
        stroke: var(--color);
    }

    .selected:visited
    {
        color: var(--color);
        stroke: var(--color);
    }
</style>