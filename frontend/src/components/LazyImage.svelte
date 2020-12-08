<img bind:this={img} class="lazy-img" class:lazy-img-loading={loading} src="" data-src={src} alt={alt}>

<script>
    import { onMount } from "svelte";

    export let src;
    export let alt;
    
    let img;
    let loading = true;

    onMount(() => {
        img.addEventListener("load", () => {
            loading = false;
        });

        img.addEventListener("error", () => {
            loading = false;
        });

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
    .lazy-img
    {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .lazy-img-loading, .lazy-img[src=""]
    {
        color: rgba(0, 0, 0, 0);
        opacity: 0;
    }
</style>