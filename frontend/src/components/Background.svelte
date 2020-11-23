
<div
    class="background-container"
    use:useStyleProperties={() => ({
        "--scale" : currentBackgroundDatas ? `${currentBackgroundDatas.scale + $scale - 100}%` : "100%",
        "--offset-y" : currentBackgroundDatas ? `${currentBackgroundDatas.offsetY}%` : "0%",
        "--brightness" : `${$brightness}%`,
        "--contrast" : currentBackgroundDatas ? `${currentBackgroundDatas.contrast}%` : "100%",
        "--blur" : `${$blur}px`,
        "--lightbox-opacity" : `${$lightboxOpacity}`
    })}
>

    <div class="img-container">
        <img class="background-img"
        src={currentBackgroundDatas ? currentBackgroundDatas.src : ""}
        alt="illustration"
        >
        <div class="shadow-frame"></div>
        <div class="light-box">
            <Lightbox lightboxDatas={currentBackgroundDatas ? currentBackgroundDatas.lightbox : null}/>
        </div>
    </div>

    <slot></slot>        
</div>

<script>
    import Lightbox from "components/Lightbox.svelte";

    import { tweened } from "svelte/motion";
    import { linear, quintIn, cubicIn, sineOut, cubicOut, quintOut} from "svelte/easing";

    import { useStyleProperties } from 'actions/useStyleProperties';
    import { backgrounds } from "stores/background.js"
    import { subscribeOnVanish, subscribeOnAppear } from "machines/styleMachine.js";
    import { subscribeOnEnter } from "machines/routeMachine.js";

    let currentBackgroundDatas = null;

    let blur = tweened(0);
    let minBlur = 0;
    let brightness = tweened(0);
    let lightboxOpacity = tweened(0);
    let scale = tweened(103);
    let maxScale = 102;

    let preload = null;

    subscribeOnVanish((state, ctx) => {
        let tweeningOpt = { duration: ctx.stepDuration, easing: linear};

        let preload = new Image();
        preload.src = backgrounds[ctx.nextKey].src;

        blur.set(4, tweeningOpt);
        brightness.set(0, tweeningOpt);
        lightboxOpacity.set(0, tweeningOpt);
        scale.set(100, {...tweeningOpt, duration: 50, delay: ctx.stepDuration - 50});
    });

    subscribeOnAppear((state, ctx) => {
        const appear = () => {
            let tweeningOpt = { duration: ctx.stepDuration, easing: linear};

            currentBackgroundDatas = backgrounds[ctx.key];
            blur.set(minBlur, tweeningOpt);
            scale.set(maxScale, tweeningOpt);
            brightness.set(currentBackgroundDatas.brightness, tweeningOpt);
            lightboxOpacity.set(1, tweeningOpt);
        };

        if(preload && !preload.complete)
        {
            preload.addEventListener('load', appear);
            return;
        }

        appear();
    });

    subscribeOnEnter((state, ctx) => {
        let tweeningOpt = { duration: ctx.stepDuration, easing: linear};

        if(!ctx.url)
        {
            minBlur = 0;
            maxScale = 100;
        }
        else
        {
            minBlur = 4;
            maxScale = 102;
        }

        blur.set(minBlur, tweeningOpt);
        scale.set(maxScale, tweeningOpt);
    });
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