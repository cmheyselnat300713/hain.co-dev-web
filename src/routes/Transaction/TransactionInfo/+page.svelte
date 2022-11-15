<script>
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import Discard from "$lib/components/buttons/Discard.svelte";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    export let data

    let no = data.no
    let agent = data.agent
    let date = data.date
    let description = data.description
    let amount = data.amount
    let type = data.type
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Karla:wght@600&display=swap" rel="stylesheet"/>
</svelte:head>

<NavbarSolo />
<NotificationContainer />

<div class="container">
    <div class="columns pt-5 is-multiline has-text-centered">
        <div class="column is-4"> 
            <ButtonBack link="../Transaction"/>
        </div>
        <div class="column is-3 ml-4">
            <p class="text has-text-link">
                {no}
            </p>
            <p class="text has-text-link">
               Transaction No.
            </p>
        </div>
        <!-- <div class="column is-4">
            <Discard link="../Transaction"/>
        </div> -->
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-6">
            <p class="text has-text-link">
                Agent
            </p>
            <p class="text has-text-black">
                {agent}
            </p>
        </div>
        <div class="column is-6">
            <p class="text has-text-link has has-text-right">
                Date
            </p>
            <p class="text has-text-black has-text-right">
                {date}
            </p>
        </div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-4">
            <p class="text has-text-link">
                Process Type
            </p>
            <p class="text has-text-black">
                {type}
            </p>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-centered">
                Amount
            </p>
            <p class="text has-text-black has-text-centered">
                {amount}
            </p>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-right">
                Description
            </p>
            <p class="text has-text-black is-size-4 has-text-right">
                {description}
            </p>
        </div>
    </div>
</div>

<style>
    .text {
        font-family: 'Karla', sans-serif;
        font-size: 40px;
    }

    p {
        font-family: 'Karla', sans-serif;
        font-size: 40px;
    }
</style>