<script>
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";
    import { notifs } from "$lib/stores/notificationStore";
    import validators from "$lib/validators";
    import axios from "$lib/api/index";

    export let data
    let admin = data.admin;
    let oldUsername = data.oldUsername;
    let updating = false

    let adminDetails = admin;

    let newAdmin = {
        adminFullName: null,
        adminUsername: null,
        adminPassword: null,
        adminIsSuperadmin: true,
        adminIsActive: true,
    }

    const updateAdminToDatabase = async () => {
        let msg = ''
        let errors = 0
        Object.keys(newAdmin).map(prop => {
            if(!newAdmin[prop] && prop !== 'adminIsActive') {
                msg += !errors ? `${prop.split('admin_').join('').split('_').join(' ')}` : `, ${prop.split('admin_').join('')}`
                errors++
            }
        })
        msg += errors ? ' are a required fields' : 'is a required field'
        if(errors) {
            $notifs = [...$notifs, {
                msg,
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isPassValid(newAdmin.adminPassword)) {
            $notifs = [...$notifs, {
                msg: 'Password does not meet the criteria for security',
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        try {
            // console.log(newAdmin)
            // return
            updating = true
            let response = await axios.put(`/admin/updateAdmin/${oldUsername}`, newAdmin)
            // alert("Admin updated successfully!")
            //console.log(response)
            if(response.status == 200) {
                updating = false
                $notifs = [...$notifs, {
                    msg: `Canteen admin: ${newAdmin.adminFullName} is updated`,
                    type: 'success',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
                await goto('../Admin');
            }else{
                updating = false
                $notifs = [...$notifs, {
                    msg: 'Error in updating an admin',
                    type: 'error',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
            }
        } catch (e) {
            updating = false
            $notifs = [...$notifs, {
                msg: 'Error in updating an admin',
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            console.log(e);
        }
    }
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns  pt-5 is-multiline has-text-centered">
        <div class="column is-4">
            <ButtonBack link="../Admin"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link">
                Admin's Information
            </p>
        </div>
        <div class="column is-3 ml-6">
            <button class="button {updating ? 'is-loading' : ''} is-rounded is-info btn-txt" on:click={updateAdminToDatabase}>
                <p class="ml-4 mr-4 has-text-white {updating ? 'is-hidden' : ''}">
                    Save
                </p>
            </button>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12">
            <div class="has-text-centered pText">Make sure to fill up all information boxes</div>
        </div>
        {#await admin}
            Waiting data
        {:then admin}
            <!-- TODO switch to bound inputs -->
            <!-- TODO: yung is active pa na checkbox ilagay -->
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span> Current Name: {adminDetails.admin_full_name}
                </p>
                <input class="pText input is-rounded" type="text" bind:value={newAdmin.adminFullName}/>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span> Current Username: {adminDetails.admin_username}
                </p>
                <input class="pText input is-rounded" type="text" bind:value={newAdmin.adminUsername}/>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span> Current Password: {adminDetails.admin_password}
                </p>
                <input class="pText input is-rounded" type="password" bind:value={newAdmin.adminPassword}/>
            </div>
        {:catch e}
            {e}
        {/await}
        <div class="column is-12">
            <div class="columns is-centered has-text-link pb-6">
                {#await admin}
                    Waiting data
                {:then admin}
                    <div class="field">
                        {#if adminDetails.admin_is_active}
                            <div class="pText has-text-centered"> <span>*</span> Admin Currently Active</div>
                        {:else}
                            <div class="pText has-text-centered"> <span>*</span> Admin Currently Inactive</div>
                        {/if}
                        <input id="switchLarge switchColorDefault switchRoundedDefault"
                               type="checkbox"
                               name="switchLarge switchColorDefault switchRoundedDefault"
                               class="switch is-large is-link is-rounded"
                               bind:checked={newAdmin.adminIsActive}>
                        {#if newAdmin.adminIsActive}
                            <label for="switchLarge switchColorDefault switchRoundedDefault">Active</label>
                        {:else}
                            <label for="switchLarge switchColorDefault switchRoundedDefault">Inactive</label>
                        {/if}
                    </div>
                {:catch e}
                    {e}
                {/await}
            </div>
        </div>
    </div>
</div>


<style>
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
    }

    .pText {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
    }

    .btn-txt {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
    }

    span {
        color: red
    }
</style>