<img bind:this={img} class="lazy-img" src="" data-src={src} alt={alt}>

<script>
    import { onMount, onDestroy } from "svelte";

    export let src;
    export let alt;
    
    let img;

    onMount(() => {
        if ("IntersectionObserver" in window)
        {
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if(!entry.isIntersecting) return;

                    let lazyImg = entry.target;
                    lazyImg.src = lazyImg.dataset.src;
                    observer.unobserve(lazyImg);
                });
            });

            observer.observe(img);
        }
        else
        {
            img.loading = "lazy";
            img.src = img.dataset.src;
        }
    });
</script>

<style>
    img
    {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    img[src=""]
    {
        font-size: 0;
    }
</style>