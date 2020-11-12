
<div
    class="background-container"
    use:useStyleProperties={() => ({
        "--background-scale" : currentBackground ? `${currentBackground.scale}%` : "100%",
        "--background-offset-y" : currentBackground ? `${currentBackground.offsetY}%` : "0%",
        "--background-offset-x" : currentBackground ? `${currentBackground.offsetX}%` : "0%",
        "--background-brightness" : `${$brightness}%`,
        "--background-contrast" : currentBackground ? `${currentBackground.contrast}%` : "100%",
        "--background-blur" : `${$blur}px`,
        "--lightbox-opacity" : `${$lightboxOpacity}`,
        "--lightbox-x" : currentBackground ? `${currentBackground.lightboxX}%` : "50%",
        "--lightbox-y" : currentBackground ? `${currentBackground.lightboxY}%` : "50%",
        "--lightbox-scale" : $lightboxScale,
        "--lightbox-color-begin" : currentBackground ? `${currentBackground.lightboxColor}` : "#000000",
        "--lightbox-color-end" : currentBackground ? `${currentBackground.lightboxColor}00` : "#00000000"
    })}
>

    <div class="img-container">
        <img class="background-img"
        src={currentBackground ? currentBackground.src : ""}
        alt="illustration"
        >
        <div class="shadow-frame"></div>
        <div class="light-box"></div>
    </div>

    <slot></slot>
        
</div>

<script>
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { createMachine } from 'xstate';
    import { useMachine } from 'utils/useMachine.js';
    import { useStyleProperties } from 'actions/useStyleProperties';
    import { backgroundDatas } from "stores/background.js";
    import { animSettings } from "settings";

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
    const brightness = tweened($backgroundDatas ? $backgroundDatas.brightness : 100, tweeningOpt);
    const blur = tweened(currentBlured ? 4 : 0, tweeningOpt);
    const lightboxOpacity = tweened(0, tweeningOpt);

    const backgroundAnimMachine = createMachine({
        id: "backgroundAnimMachine",
        context: {
            preload: null
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

                blur.set(4);
                lightboxOpacity.set(0);
                return brightness.set(0);
            },
            appear: (ctx) => {
                const appear = () => {
                    currentBackground = $backgroundDatas;
                    blur.set(blured ? 4 : 0);
                    lightboxOpacity.set(1);
                    return brightness.set(currentBackground.brightness);
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

    const { send } = useMachine(backgroundAnimMachine);

    $ : if(currentBackground != $backgroundDatas && isMounted)
    {
        send("BACKGROUND_CHANGE");
    }

    $ : if(currentBlured != blured && isMounted)
    {
        currentBlured = blured;
        send("BLURED_CHANGE");
    }

    const lightboxScale = tweened(1, {
        duration: animSettings.lightboxDuration,
        easing: linear
    });

    const growLightbox = () => {
        lightboxScale.set($backgroundDatas ? $backgroundDatas.lightboxMaxScale : 1.5).then(shrinkLightbox);
    };

    const shrinkLightbox = () => {
        lightboxScale.set(1).then(growLightbox);
    };

    growLightbox();
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
        transform: scale(var(--background-scale)) translateY(var(--background-offset-y));
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

        background: radial-gradient(
            circle at var(--lightbox-x) var(--lightbox-y),
            var(--lightbox-color-begin) 0%,
            var(--lightbox-color-begin) calc(10% * var(--lightbox-scale)),
            var(--lightbox-color-end) calc(25% * var(--lightbox-scale))
        );
        opacity: var(--lightbox-opacity);
        mix-blend-mode: overlay;
    }

    .background-img
    {
        height: 100%;
        width: auto;
        filter: grayscale(100%) contrast(var(--background-contrast)) brightness(var(--background-brightness)) blur(var(--background-blur));
    }

    .background-img[src=""]
    {
        font-size: 0;
        position: relative;
    }
</style>