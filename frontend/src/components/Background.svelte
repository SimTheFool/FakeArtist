
<div 
    class="background-container"
    style={style};
>
    <div class="shadow-box">
        <img class="background-img"
        src={currentBackground ? currentBackground.img : ""}
        alt="illustration"
        >
    </div>
        
</div>

<script>
    import { backgroundsRegistry, backgroundDatas } from 'stores/background.js';
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';
    import { objectToStyle } from 'utils/objectToStyle';

    export let backgrounds = null;

    backgroundsRegistry.set(backgrounds);

    const tweeningOpt = {
        duration: 800,
        easing: linear
    }

    let currentBackground = $backgroundDatas;
    const opacity = tweened(1, tweeningOpt);
    const blur = tweened(0, tweeningOpt);

    $: if (currentBackground != $backgroundDatas)
    {
        blur.set(4).then(() => {
            currentBackground = $backgroundDatas;
            blur.set(0);
        });

        opacity.set(0).then(() => {
            opacity.set(1);
        });
    }

    let style = "";

    $ : {
        style = objectToStyle({
        "--background-scale" : currentBackground ? `${currentBackground.scale}%` : "100%",
        "--background-offset-y" : currentBackground ? `${currentBackground.offsetY}%` : "0%",
        "--background-opacity" : $opacity,
        "--background-blur" : `${$blur}px`,
        });
    }
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

    .shadow-box
    {
        position: relative;
        display: inline-block;
        height: 100%;
        transform: scale(var(--background-scale)) translateY(var(--background-offset-y));

        overflow: hidden;
    }

    .shadow-box::after
    {
        box-shadow: inset 0px 0px 10px 30px black;
        box-sizing: border-box;

        content: "";
        position: absolute;
        top: -1px;
        left: -1px ;
        display: block;
        height: calc(100% + 2px);
        width: calc(100% + 2px);
    }

    .background-img
    {
        height: 100%;
        width: auto;
        filter: grayscale(1) contrast(2.50) brightness(0.75) blur(var(--background-blur)) opacity(var(--background-opacity));
    }
</style>