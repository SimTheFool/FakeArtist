<!-- <div id="about">
    {#each elems as article}

        <h2>{article.title}</h2>
        <p>{article.content}</p>
    
    {/each}

    {#each elems as article}

        <h2>{article.title}</h2>
        <p>{article.content}</p>
        
    {/each}

    {#each elems as article}

        <h2>{article.title}</h2>
        <p>{article.content}</p>
        
    {/each}
</div> -->

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`api/about`);
        const elems = await res.json();
        return {elems};
    }
</script>

<script>
    export let elems;
</script>

<style>
    #about
    {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    h2
    {
        font-size: 1em;
        margin: 1em 0 0.25em 0;
    }

    p
    {
        font-size: 0.7em;
        margin: 0;
    }
</style>