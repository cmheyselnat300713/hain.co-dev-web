<script>
    //@ts-nocheck
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import Card from "$lib/components/otherComponents/Card.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonAddRecord from "$lib/components/buttons/ButtonAddRecord.svelte";
    import FixedLoadingScreen from "$lib/components/otherComponents/FixedLoadingScreen.svelte";
    import {admins} from "$lib/stores/adminStore";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    onMount(async () => {
        if (!localStorage.getItem("admin")) {
            await goto("/");
        }
    })

    let adminNumber = 1;
    const counter = () => {
        return adminNumber++;
    }
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4 has-text-centered">
            <ButtonBack link="Database"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Administrators
            </p>
        </div>
        <div class="column is-3 ml-4">
            <ButtonAddRecord link="Admin/AddNewAdmin"/>
        </div>
    </div>

    <div class="columns is-centered is-multiline pt-5">
        {#await $admins}
            <FixedLoadingScreen/>
        {:then admin}
            {#each admin as info}
                <Card
                    name={info.admin_username}
                    sub={info.admin_full_name}
                    imagePath="images/adminIcon.png"
                    link="Admin/{info.admin_username}"/>
            {/each}
        {:catch err}
            <p>{err.message}</p>
            <!-- error message component -->
        {/await}
    </div>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 40px;
    }
</style>