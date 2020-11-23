<div
    use:useStyleProperties={() => ({
        "--lightbox-x" : lightboxDatas ? `${lightboxDatas.lightboxX}%` : "50%",
        "--lightbox-y" : lightboxDatas ? `${lightboxDatas.lightboxY}%` : "50%",
        "--lightbox-scale" : $lightboxScale,
        "--lightbox-color-begin" : lightboxDatas ? `${lightboxDatas.lightboxColor}` : "#000000",
        "--lightbox-color-end" : lightboxDatas ? `${lightboxDatas.lightboxColor}00` : "#00000000"
    })}
>
</div>

<script>
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { useStyleProperties } from 'actions/useStyleProperties';
    import { animSettings } from "settings";

    export let lightboxDatas;

    let lightboxScale = tweened(1, { duration: animSettings.lightboxStepDuration, easing: linear});

    const expand = () => {
        lightboxScale.set(lightboxDatas ? lightboxDatas.lightboxMaxScale : 1.5).then(shrink);
    };

    const shrink = () => {
        lightboxScale.set(1).then(expand);
    };

    expand();
</script>


<style>
    div
    {
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