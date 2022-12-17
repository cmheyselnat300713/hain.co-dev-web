<script>
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import {goto} from "$app/navigation";
    import { notifs } from "$lib/stores/notificationStore";
    import validators from "$lib/validators";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";
    import axios from "$lib/api/index";
  import { onMount } from "svelte";

    export let data

    let canteenStaff = data.canteenStaff;
    let oldUsername = data.oldUsername;
    let updating = false

    let canteenStaffDetails = canteenStaff;

    let newStaff = {
        staffFullName: null,
        staffContactNumber: null,
        staffUsername: null,
        staffPassword: null,
        staffPosition: 1,
        staffIsActive: true
    }

    let positions = [
        {value: 1, position: "CHEF"},
        {value: 2, position: "CASHIER"},
        {value: 3, position: "SERVER"}
    ]

    const identifyType = (code) => {
        switch (code) {
            case 1:
                return "Chef"

            case 2:
                return "Cashier"

            case 3:
                return "Server"
        }
    }

    const updateStaffToDatabase = async () => {
        let msg = ''
        let errors = 0
        Object.keys(newStaff).map(prop => {
            if(!newStaff[prop]) {
                msg += !errors ? `${prop.split('staff').join('')}` : `, ${prop.split('staff').join('')}`
                errors++
            }
        })
        msg += errors ? ' are required fields' : ' is a required field'
        if(errors) {
            $notifs = [...$notifs, {
                msg,
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        if(validators.containsLettersAndCharacters(newStaff.staffContactNumber)) {
            $notifs = [...$notifs, {
                msg: 'Contact No. cannot have letters and/or special characters',
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        if(newStaff.staffContactNumber.length != 11) {
            $notifs = [...$notifs, {
                msg: 'Gash number must be exactly 11 numbers e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!newStaff.staffContactNumber.substring(0, 2).match('09')) {
            $notifs = [...$notifs, {
                msg: 'Gcash number must be start with 09 e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isPassValid(newStaff.staffPassword)) {
            $notifs = [...$notifs, {
                msg: 'Password does not meet the criteria for security',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }
        try {
            updating = true
            // console.log(newStaff)
            let response = await axios.put(`/staff/updateStaff/${oldUsername}`, newStaff);
            if(response.status == 200) {
                updating = false
                $notifs = [...$notifs, {
                    msg: `Canteen staff: ${newStaff.staffFullName} is updated`,
                    type: 'success',
                    id: (Math.random() * 100) + 1
                }]
                await goto('../CanteenStaff');
            }else{
                updating = false
                $notifs = [...$notifs, {
                    msg: `Error in updating staff`,
                    type: 'error',
                    id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
                }]
            }
            // console.log(response)
            // alert('Staff updated successfully!')
        } catch (e) {
            updating = false
            $notifs = [...$notifs, {
                msg: `Error in updating staff`,
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            console.log(e);
        }
    }

    onMount(() => {
        newStaff.staffContactNumber = canteenStaffDetails.staff_contact_number
        newStaff.staffFullName = canteenStaffDetails.staff_full_name
        newStaff.staffPassword = canteenStaffDetails.staff_password
        newStaff.staffPosition = canteenStaffDetails.staff_position
        newStaff.staffUsername = canteenStaffDetails.staff_username
    })
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns  pt-5 is-multiline has-text-centered">
        <div class="column is-4">
            <ButtonBack link="../CanteenStaff"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link">
                Canteen Staff's Information
            </p>
        </div>
        <div class="column is-3 ml-6">
            <button class="button {updating ? 'is-loading' : ''} is-rounded is-info btn-txt" on:click={updateStaffToDatabase}>
                <p class="{updating ? 'is-hidden' : ''} ml-4 mr-4 has-text-white">
                    Save
                </p>
            </button>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12">
            <div class="has-text-centered pText">Make sure to fill up all information boxes</div>
        </div>
        {#await canteenStaff}
            Waiting data
        {:then staff}
            <!-- TODO switch to bound inputs -->
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span>  Name: {canteenStaffDetails.staff_full_name}
                </p>
                <input class="pText input is-rounded" type="text" bind:value={newStaff.staffFullName}/>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span>  Position: {identifyType(canteenStaffDetails.staff_position)}
                </p>
                <select bind:value={newStaff.staffPosition} class="pText input is-rounded">
                    {#each positions as pos}
                        <option value={pos.value}>
                            {pos.position}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span>  Contact Number: {canteenStaffDetails.staff_contact_number}
                </p>
                <input class="pText input is-rounded" type="text" bind:value={newStaff.staffContactNumber}/>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span>  Username: {canteenStaffDetails.staff_username}
                </p>
                <input class="pText input is-rounded" type="text" bind:value={newStaff.staffUsername}/>
            </div>
            <div class="column is-3 is-offset-2">
                <p class="pText has-text-link ml-4 mb-1">
                    <span>*</span>  Password:
                </p>
                <input class="pText input is-rounded" type="password" bind:value={newStaff.staffPassword}/>
            </div>
        {:catch e}
            {e}
        {/await}
        <div class="column is-12">
            <div class="columns is-centered has-text-link pb-6">
                {#await canteenStaff}
                    Waiting data
                {:then staff}
                    <!-- <div class="field">
                        {#if canteenStaffDetails.staff_is_active}
                            <div class="pText has-text-centered"> <span>*</span> Staff Currently Active</div>
                        {:else}
                            <div class="pText has-text-centered"> <span>*</span> Staff Currently Inactive</div>
                        {/if}
                        <input id="switchLarge switchColorDefault switchRoundedDefault"
                               type="checkbox"
                               name="switchLarge switchColorDefault switchRoundedDefault"
                               class="switch is-large is-link is-rounded"
                               bind:checked={newStaff.staffIsActive}>
                        {#if newStaff.staffIsActive}
                            <label for="switchLarge switchColorDefault switchRoundedDefault">Active</label>
                        {:else}
                            <label for="switchLarge switchColorDefault switchRoundedDefault">Inactive</label>
                        {/if}
                    </div> -->
                {:catch e}
                    {e}
                {/await}
            </div>
        </div>
        <div class="column is-12"></div>
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