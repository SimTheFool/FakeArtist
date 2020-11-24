
<div id="contact"
    use:useStyleProperties={() => ({
        "--color": `${color}`,
        "--opacity": `${$opacity}`
    })}
>
    <form on:submit|preventDefault={handleFormSubmit}>
        <label for="email">Votre adresse mail</label>
        <input id="email" class="form-elem" name="email" type="text">
    
        <label for="message">Votre message</label>
        <textarea id="message" class="form-elem" name="message" cols="10" rows="20"></textarea>
    
        <button type="submit" class="form-elem">Envoyer</button>
    </form>
</div>

<script>
    import { onDestroy } from "svelte";
    import { tweened } from "svelte/motion";

    import { subscribeOnVanish } from "machines/styleMachine.js";
    import { subscribeOnExit, subscribeOnEnter } from "machines/routeMachine.js";
    import { useStyleProperties } from "actions/useStyleProperties.js";
    import { backgrounds } from "stores/background.js";

    let color = "#ffffff00";
    let opacity = tweened(0);

    const unsubscribeOnVanish = subscribeOnVanish((state, ctx) => {
        color = backgrounds[ctx.nextKey].color;
    });

    const unsubscribeOnExit = subscribeOnExit((state, ctx) => {
        opacity.set(0, {duration: ctx.stepDuration});
    });

    const unsubscribeOnEnter = subscribeOnEnter((state, ctx) => {
        opacity.set(1, {duration: ctx.stepDuration});
        color = backgrounds[ctx.styleMachine.context.key].color;
    });

    const handleFormSubmit = () => {
        console.log("This is a demo, contact form submission is not implemented !");
    };

    onDestroy(() => {
        unsubscribeOnVanish();
        unsubscribeOnExit();
        unsubscribeOnEnter();
    });

</script>

<style>

    #contact
    {
        display: flex;
        width: 100%;
        height: 100%;

        justify-content: center;
        align-content: center;
        align-items: center;
    }

    form
    {
        flex: 0 0 90%;
        max-width: 1000px;
        opacity: var(--opacity);

    }

    .form-elem
    {
        box-sizing: border-box;
        margin-bottom: 1em;
        font-size: 0.7em;
        color: white;
        border: #ffffff00 solid 3px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 0.2em 1em 0.2em 1em;

        transition: border 0.5s linear;
    }

    .form-elem:focus
    {
        border: var(--color) solid 3px;
    }

    button:hover
    {
        border: var(--color) solid 3px;
    }

    button:active
    {
        background-color: rgba(255, 255, 255, 0.431);
    }

    label
    {
        display: block;
        font-size: 0.65em;
    }

    #email
    {
        height: 1.5em;
    }

    #message
    {
        width:100%;
    }

    button
    {
        display: block;
        float: right;
    }

</style>