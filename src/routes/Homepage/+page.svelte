<script lang="ts">
    import HomeNavbar from "$lib/components/navbars/HomeNavbar.svelte";
    import axios from "$lib/api/index";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import LoadingScreen from "$lib/components/otherComponents/LoadingScreen.svelte";
    import { notifs } from "$lib/stores/notificationStore";
    import validators from "$lib/validators";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    let userInfo = {
        username: "",
        password: ""
    }

    onMount(async () => {
        if (localStorage.getItem("admin")) {
            await goto("/Database")
        }
    })

    let loading = false;

    const addToLocalStorage = async () => {
        let msg = ''
        let error = false
        let errorCounter = 0
        Object.keys(userInfo).map(prop => {
            if(!userInfo[prop]) {
                error = true
                errorCounter++
                msg += msg.length == 0 ? `${prop}` : `and ${prop}`
            }
        })
        msg += errorCounter > 1 ? ' are required fields' : ' is a required field'

        if(error) {
            $notifs = [...$notifs, {
                msg,
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isPassValid(userInfo.password)) {
            $notifs = [...$notifs, {
                msg: 'Password does not meet the security criteria',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        try {
            loading = true;
            const {data} = await axios.get(`/admin/auth/${userInfo.username}`);
            const adminInfo = data.adminDetails;
            console.log(adminInfo);
            if (adminInfo.admin_password === userInfo.password) {
                localStorage.setItem("admin", JSON.stringify(userInfo));
                loading = false;
                goto("/Database");
            } else {
                $notifs = [...$notifs, {
                    msg: 'Invalid password',
                    type: 'error',
                    id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
                }]
                loading = false;
            }
        } catch (e) {
            // Change msg for the client
            $notifs = [...$notifs, {
                msg: `${e}`,
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            loading = false;
            console.log(e);
        }
    }

    const keyDown = async e => {
        if(e.keyCode == 13) await addToLocalStorage()
    }
</script>

<svelte:window on:keydown={keyDown} />

{#if loading}
<LoadingScreen infinite={true}/>
{:else}
<HomeNavbar/>
<NotificationContainer />

<div class="container">
    <div class="columns is-multiline">
        <div class="column is-4 is-offset-2">
            <section class="section pt-0"></section>
            <section class="section is-flex is-justify-content-center pb-3">
                <img src="images/logo_1.png" alt="logo" class="logo"/>
            </section>
            <section class="section is-medium pb-0 has-text-centered is-paddingless">
                <h1 class="has-text-link">
                    Hain.co
                </h1>
            </section>
        </div>

        <div class="c1 column is-5">
            <div class="column is-12"></div>
            <div class="column is-12"></div>
            <div class="column is-12"></div>
            <div class="column is-12"></div>
            <div class="column is-12"></div>
            <div class="column is-12"></div>
            <div class="container is-flex is-justify-content-center is-flex-wrap-wrap">
                <h1 class="has-text-link has-text-centered mb-5">
                    Login to Application
                </h1>
                <section class="section is-paddingless">
                    <div class="container px-5 is-flex is-flex-wrap-wrap">
                        <p class="text has-text-link ml-6 mb-2 pl-3">
                            Username
                        </p>
                        <input class="input is-rounded mx-6 mb-3"
                               type="text"
                               required
                               placeholder="ID Number"
                               bind:value={userInfo.username}/>
                        <p class="text has-text-link ml-6 mb-2 pl-3">
                            Password
                        </p>
                        <input class="input is-rounded mx-6"
                               type="password"
                               required
                               placeholder="Password"
                               bind:value={userInfo.password}/>
                    </div>
                </section>
                <!-- TODO add the session for logging in -->
                <button class="button is-link is-rounded mt-5" on:click={addToLocalStorage}>Login</button>
            </div>
        </div>
    </div>
</div>

{/if}

<style>
    h1 {
        font-family: 'Titan One', cursive;
        font-size: 45px;
    }

    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
    }

    .logo {
        min-width: 350px;
       
    }
</style>