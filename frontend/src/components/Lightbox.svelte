<div

    style= {`--lightbox-x: ${lightboxDatas ? `${lightboxDatas.lightboxX}%` : "50%"};
        --lightbox-y: ${lightboxDatas ? `${lightboxDatas.lightboxY}%` : "50%"};
        --lightbox-scale: ${$lightboxScale};
        --lightbox-color-begin: ${lightboxDatas ? `${lightboxDatas.lightboxColor}` : "#000"};
        --lightbox-color-end: ${lightboxDatas ? `${lightboxDatas.lightboxColor}00` : "#0000"};
    `}
    
>
</div>

<script>
    import { tweened } from 'svelte/motion';
    import { linear, cubicOut } from 'svelte/easing';
    import { animSettings } from "settings";

    export let lightboxDatas;

    let lightboxScale = tweened(1, { duration: animSettings.lightboxStepDuration});

    const expand = () => {
        lightboxScale.set(lightboxDatas ? lightboxDatas.lightboxMaxScale : 1.5, {easing: cubicOut}).then(() => {
            setTimeout(shrink, animSettings.lightboxStepDuration*2);
        });
    };

    const shrink = () => {
        lightboxScale.set(1, {easing: linear}).then(expand);
    };

    expand();
</script>


<style>
    div
    {
        will-change: background;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle at var(--lightbox-x) var(--lightbox-y),
            var(--lightbox-color-begin) 0%,
            var(--lightbox-color-begin) calc(10% * var(--lightbox-scale)),
            var(--lightbox-color-end) calc(25% * var(--lightbox-scale))
        );
    }
</style>