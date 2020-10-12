<script context="module">
    export async function preload(page, session)
    {
        const res = await this.fetch("/jobs.json");
        const jobs = await res.json();

        console.log(jobs);

        return {jobs};
    }
</script>

<script>
    export let jobs;
</script>

<style>

</style>

<h2>All jobs for ninja.</h2>
<ul>
{#each jobs as job}
    <li>{job.name}</li>
{/each}
</ul>

<div>
    <a href="/jobs/create">Create new job</a>
</div>
