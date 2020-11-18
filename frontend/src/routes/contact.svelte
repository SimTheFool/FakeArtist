
<div id="contact">
    <form on:submit|preventDefault={handleFormSubmit}>
        <label for="email">Votre adresse mail</label>
        <input id="email" class="form-elem" name="email" type="text">
    
        <label for="message">Votre message</label>
        <textarea id="message" class="form-elem" name="message" cols="10" rows="20"></textarea>
    
        <button type="submit" class="form-elem">Envoyer</button>
    </form>
</div>

<script>
    let handleFormSubmit = () => {};
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

    }

    input, textarea, button
    {
        margin-bottom: 1em;
        font-size: 0.7em;
        color: white;
        border: none;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 0.2em 1em 0.2em 1em;
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