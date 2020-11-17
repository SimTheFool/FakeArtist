    <a
        href={url}
        on:mouseover={handleLinkHover}
        on:touchstart={handleLinkHover}
        on:click={handleLinkClick}
        class:selected={currentSelected}
        use:useStyleProperties={() => ({
            "--color": `${currentSelectedColor}`,
        })}
    >
        <slot>
        </slot>
    </a>

<script>
    import { tweened } from "svelte/motion";
    import { createEventDispatcher } from "svelte";
    import { useStyleProperties } from 'actions/useStyleProperties';
    import { backgroundDatas } from "stores/background.js";
    import { useMachine } from 'utils/useMachine.js';
    import { animSettings } from "settings";

    export let url = "";
    export let selected = false;

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

    let currentSelectedColor = "#ffffff";
    let currentSelected = false;

    const { send } = useMachine({
        id: "linkAnimMachine",
        initial: "idle",
        context:
        {
            timer: tweened(0, {
                duration: animSettings.stepDuration
            })
        },
        states:
        {
            idle:
            {   
                on: { SELECTED_CHANGE: "selecting", BACKGROUND_CHANGE: "waiting" }
            },
            waiting:
            {
                invoke:
                {
                    src: "wait",
                    onDone: { target : "selecting"}
                },
                on: { SELECTED_CHANGE: "selecting" }
            },
            selecting:
            {
                invoke:
                {
                    src: "select",
                    onDone: { target : "idle"}
                },
                on: { SELECTED_CHANGE: "selecting" }
            }
        }
    },
    {
        services:
        {
            wait: (ctx) => {
                return ctx.timer.set(1);
            },
            select: (ctx) => {
                currentSelected = selected;
                currentSelectedColor = $backgroundDatas.color;
                return ctx.timer.set(0);
            }
        }
    });

    $ : if(currentSelected != selected)
    {
        send("SELECTED_CHANGE");
    }

    $ : if(currentSelectedColor != $backgroundDatas.color)
    {
        send("BACKGROUND_CHANGE");
    }
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