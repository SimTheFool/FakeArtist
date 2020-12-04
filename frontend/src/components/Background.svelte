
<div
    class="background-container"
    style={`
        --duration: ${animSettings.stepDuration}ms;
        --scale: ${currentBackgroundDatas ? currentBackgroundDatas.scale : 1};
        --offset-y: ${currentBackgroundDatas ? currentBackgroundDatas.offsetY : 0};
        --brightness: ${brightness}%;
        --contrast: ${currentBackgroundDatas ? currentBackgroundDatas.contrast : 100}%;
        --blur: ${blur}px;
        --lightbox-opacity: ${lightboxOpacity};
    `}   
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

    import { backgrounds } from "stores/background.js"
    import { subscribeOnVanish, subscribeOnAppear } from "machines/styleMachine.js";
    import { subscribeOnEnter } from "machines/routeMachine.js";
    import { animSettings } from "settings";

    let currentBackgroundDatas = null;

    let blur = 0;
    let minBlur = 0;
    let brightness = 0;
    let lightboxOpacity = 0;

    let preload = null;

    subscribeOnVanish((state, ctx) => {
        let preload = new Image();
        preload.src = backgrounds[ctx.nextKey].src;

        blur = 4;
        brightness = 0;
        lightboxOpacity = 0;
    });

    subscribeOnAppear((state, ctx) => {
        const appear = () => {
            currentBackgroundDatas = backgrounds[ctx.key];

            blur = minBlur;
            brightness = currentBackgroundDatas.brightness;
            lightboxOpacity = 1;
        };

        if(preload && !preload.complete)
        {
            preload.addEventListener('load', appear);
            return;
        }

        appear();
    });

    subscribeOnEnter((state, ctx) => {

        if(!ctx.url)
        {
            minBlur = 0;
        }
        else
        {
            minBlur = 4;
        }

        blur = minBlur;
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
        filter:  blur(var(--blur));
        transition: filter var(--duration) linear;
        
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
        transition: opacity var(--duration) linear;
        mix-blend-mode: overlay;
    }

    .background-img
    {
        height: 100%;
        width: auto;
        filter: grayscale(100%) contrast(var(--contrast)) brightness(var(--brightness));
        transition: filter var(--duration) linear;
    }

    .background-img[src=""]
    {
        font-size: 0;
        position: relative;
    }
</style>