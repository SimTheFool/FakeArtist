
<div 
    class="background-container"
    use:appendStyle={() => ({
        "--background-scale" : currentBackground ? `${currentBackground.scale}%` : "100%",
        "--background-offset-y" : currentBackground ? `${currentBackground.offsetY}%` : "0%",
        "--background-brightness" : `${$brightness}%`,
        "--background-contrast" : currentBackground ? `${currentBackground.contrast}%` : "100%",
        "--background-blur" : `${$blur}px`,
        "--lightbox-x" : currentBackground ? `${currentBackground.lightboxX}%` : "50%",
        "--lightbox-y" : currentBackground ? `${currentBackground.lightboxY}%` : "50%",
        "--lightbox-scale" : $lightboxScale,
        "--lightbox-color-begin" : currentBackground ? `${currentBackground.lightboxColor}` : "#FFFFFF",
        "--lightbox-color-end" : currentBackground ? `${currentBackground.lightboxColor}00` : "#FFFFFF00"
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
        
</div>

<script>
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { backgroundsRegistry, backgroundDatas } from 'stores/background.js';
    import { appendStyle } from 'actions/appendStyle';

    export let backgrounds = null;
    backgroundsRegistry.set(backgrounds);

    let currentBackground = $backgroundDatas;

    const tweeningOpt = {
        duration: 750,
        easing: linear
    }
    const brightness = tweened($backgroundDatas ? $backgroundDatas.brightness : 100, tweeningOpt);
    const blur = tweened(0, tweeningOpt);

    const vanish = () => {
        blur.set(4);
        return brightness.set(0);
    };

    const appear = () => {
        currentBackground = $backgroundDatas;
        blur.set(0);
        brightness.set(currentBackground.brightness);
    };

    $: if (currentBackground != $backgroundDatas)
    {
        let preload = new Image();
        preload.src = $backgroundDatas.src;

        vanish().then(() => {
            if(!preload.complete)
            {
                preload.addEventListener('load', () => {
                    appear();
                });
            }
            else
            {
                appear();
            }
        });
    }

    const lightboxScale = tweened(1, {
        duration: 2000,
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
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;

        width: 100%;
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
        display: inline-block;
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

        box-shadow: inset 0px 0px 10px 30px black;
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
            var(--lightbox-color-begin) calc(15% * var(--lightbox-scale)),
            var(--lightbox-color-end) calc(25% * var(--lightbox-scale))
        );
        mix-blend-mode: overlay;
    }

    .background-img
    {
        height: 100%;
        width: auto;
        filter: grayscale(100%) contrast(var(--background-contrast)) brightness(var(--background-brightness)) blur(var(--background-blur));
    }
</style>