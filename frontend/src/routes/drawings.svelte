<div id="drawings">
    {#each elems as drawing}
        <img src={drawing.src} alt="some drawing">
    {/each}
</div>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`api/drawings`);
        const elems = await res.json();
        return {elems};
    }
</script>

<script>
    export let elems;
</script>

<style>

    #drawings
    {
        display: grid;
        width: 100%;
        height: 100%;

        grid-template-columns: repeat(3, 15vw);
        grid-auto-rows: 20vh;
        grid-auto-flow: row;
        row-gap: 1em;

        justify-content: space-around;

        overflow: scroll;
    }

    img
    {
        display: block;
        width: 100%;
        height: 100%;
        
        object-fit: cover;
    }
</style>