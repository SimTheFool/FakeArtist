<script>
    import {goto} from "@sapper/app";

    let jobName = "";

    const handleSubmit = async () => {
        const res = await fetch("/jobs.json", {
            method: "POST",
            headers : {"content-type" : "application/json"},
            body: JSON.stringify({ name: jobName})
        });

        const updatedDatas = await res.json();

        goto('jobs');
    }
</script>

<style>
    
</style>

<h2>Create job</h2>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="job name" bind:value={jobName}>
    <button>Add new job</button>
</form>