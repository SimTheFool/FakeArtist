<svelte:head>
	<title>{status}</title>
</svelte:head>

<div id="error">
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>

<div id="error-link">
	<a href="./" rel=external>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="100 100 465 534.3105269670394" class="logo">
			<path d="M273.55 609.93C257.09 492.37 260.72 424.15 284.44 405.27C320.02 376.95 372.95 386.37 403.46 414.71C423.8 433.6 428.39 496.49 417.25 603.39C440.17 585.17 454.5 573.79 460.23 569.23C528.08 515.32 564.4 431 556.97 344.66C553.94 309.39 546.35 221.21 534.22 80.11C549.61 293.5 521.51 385.92 449.9 357.37C342.5 314.56 260.49 327.62 205.34 371.89C168.57 401.4 143.15 334.84 129.09 172.2C125.34 273.16 122.99 336.25 122.06 361.49C119.21 437.95 152.43 511.31 211.76 559.61C220 566.32 240.6 583.09 273.55 609.93Z" id="ctUB5IoKq"></path>
		</svg>
		Back to home
	</a>
</div>




<script>
	import Navlink from "components/Navlink.svelte";

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	#error
	{
		width: 100%;

		text-align:  center;
	}

	#error-link
	{
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;

		width: 100%;
		height: 2em;
	}

	svg
	{
		width: 1em;
		stroke-width: 1em;
	}

	a
    {
        text-decoration: none;
        display: inline-block;
        color: white;
        stroke: white;
        transition: color 0.5s ease-out, stroke 0.5s ease-out, transform 0.5s ease-out;
    }

    a:visited
    {
        color:white;
        stroke: white;
    }

    a:hover
    {
        transform: scale(0.9);
    }
</style>

