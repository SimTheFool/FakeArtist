
<div
    class="background-container"
    use:useStyleProperties={() => ({
        "--scale" : currentBackground ? `${currentBackground.scale}%` : "100%",
        "--offset-y" : currentBackground ? `${currentBackground.offsetY}%` : "0%",
        "--brightness" : `${$brightness}%`,
        "--contrast" : currentBackground ? `${currentBackground.contrast}%` : "100%",
        "--blur" : `${$blur}px`,
        "--lightbox-opacity" : `${$lightboxOpacity}`
    })}
>

    <div class="img-container">
        <img class="background-img"
        src={currentBackground ? currentBackground.src : ""}
        alt="illustration"
        >
        <div class="shadow-frame"></div>
        <div class="light-box">
            <Lightbox lightboxDatas={currentBackground ? currentBackground.lightbox : null}/>
        </div>
    </div>

    <slot></slot>        
</div>

<script>
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { useMachine } from 'utils/useMachine.js';
    import { useStyleProperties } from 'actions/useStyleProperties';
    import { backgroundDatas } from "stores/background.js";
    import { animSettings } from "settings";
    import Lightbox from 'components/Lightbox.svelte';

    export let blured;

    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });

    let currentBackground = null;
    let currentBlured = false;

    const tweeningOpt = {
        duration: animSettings.stepDuration,
        easing: linear
    };

    const { send, brightness, blur, lightboxOpacity } = useMachine({
        id: "backgroundAnimMachine",
        context: {
            preload: null,
            brightness: tweened($backgroundDatas ? $backgroundDatas.brightness : 100, tweeningOpt),
            blur: tweened(currentBlured ? 4 : 0, tweeningOpt),
            lightboxOpacity: tweened(0, tweeningOpt)
        },
        initial: "idle",
        states:
        {
            idle:
            {   
                on: { BACKGROUND_CHANGE: "vanish", BLURED_CHANGE: "appear" }
            },
            vanish:
            {
                invoke:
                {
                    src: "vanish",
                    onDone: { target : "appear"}
                }
            },
            appear:
            {
                invoke:
                {
                    src: "appear",
                    onDone: { target : "idle"}
                },
                on: { BACKGROUND_CHANGE: "vanish", BLURED_CHANGE: "appear" }
            }
        }
    },
    {
        services:
        {
            vanish: (ctx) => {
                ctx.preload = new Image();
                ctx.preload.src = $backgroundDatas.src;

                ctx.blur.set(4);
                ctx.lightboxOpacity.set(0);
                return ctx.brightness.set(0);
            },
            appear: (ctx) => {
                const appear = () => {
                    currentBackground = $backgroundDatas;
                    ctx.blur.set(blured ? 4 : 0);
                    ctx.lightboxOpacity.set(1);
                    return ctx.brightness.set(currentBackground.brightness);
                };

                if(ctx.preload && !ctx.preload.complete)
                {
                    return new Promise((resolve, reject) => {
                        ctx.preload.addEventListener('load', () => {
                            appear().then(resolve());
                        });
                    });
                }
                else
                {
                    return appear();
                }
            }
        }
    });

    $ : if(currentBackground != $backgroundDatas && isMounted)
    {
        send("BACKGROUND_CHANGE");
    }

    $ : if(currentBlured != blured && isMounted)
    {
        currentBlured = blured;
        send("BLURED_CHANGE");
    }
</script>

<style>
    .background-container
    {
        flex: 1 1 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;

        overflow: hidden;

        background-color: black;
    }

    .img-container
    {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        height: 100%;

        overflow: hidden;
        transform: scale(var(--scale)) translateY(var(--offset-y));
    }

    .shadow-frame
    {
        position: absolute;
        top: -1px;
        left: -1px;
        display: block;
        height: calc(100% + 2px);
        width: calc(100% + 2px);

        box-shadow: inset 0px 0px 10px 20px black;
        box-sizing: border-box;
    }

    .light-box
    {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        width: 100%;

        opacity: var(--lightbox-opacity);
        mix-blend-mode: overlay;
    }

    .background-img
    {
        height: 100%;
        width: auto;
        filter: grayscale(100%) contrast(var(--contrast)) brightness(var(--brightness)) blur(var(--blur));
    }

    .background-img[src=""]
    {
        font-size: 0;
        position: relative;
    }
</style>