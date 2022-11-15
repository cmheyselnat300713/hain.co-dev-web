<script>
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import Discard from "$lib/components/buttons/Discard.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import axios from "$lib/api";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";
    import { notifs } from "$lib/stores/notificationStore";
    import validators from "$lib/validators";

    let staff = {
        staffFullName: null,
        staffContactNumber: null,
        staffUsername: null,
        staffPassword: null,
        staffPosition: 1,
        staffIsActive: true
    }
    let adding = false

    let positions = [
        {value: 1, position: "CHEF"},
        {value: 2, position: "CASHIER"},
        {value: 3, position: "SERVER"}
    ]

    const addStaffToDatabase = async () => {
        let msg = ''
        let errors = 0
        Object.keys(staff).map(prop => {
            if(!staff[prop]) {
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

        if(validators.containsLettersAndCharacters(staff.staffContactNumber)) {
            $notifs = [...$notifs, {
                msg: 'Contact No. cannot have letters and/or special characters',
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        if(staff.staffContactNumber.length != 11) {
            $notifs = [...$notifs, {
                msg: 'Gash number must be exactly 11 numbers e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!staff.staffContactNumber.substring(0, 2).match('09')) {
            $notifs = [...$notifs, {
                msg: 'Gcash number must be start with 09 e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isPassValid(staff.staffPassword)) {
            $notifs = [...$notifs, {
                msg: 'Password does not meet the criteria for security',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        try {
            adding = true
            // console.log(staff)
            let response = await axios.post('/staff/createStaff', staff)
            if(response.status == 200) {
                adding = false
                $notifs = [...$notifs, {
                    msg: `New canteen staff: ${staff.staffFullName}`,
                    type: 'success',
                    id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
                }]
                await goto("../CanteenStaff")
            }else{
                adding = false
                $notifs = [...$notifs, {
                    msg: `Error in adding new staff`,
                    type: 'error',
                    id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
                }]
            }
            // console.log(response)
            // alert('Staff added successfully!')
        } catch (e) {
            adding = false
            $notifs = [...$notifs, {
                msg: `Error in adding new staff`,
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            console.log(e)
        }
    }
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns pt-5 is-multiline has-text-centered">
        <div class="column is-4">
            <ButtonBack link="../CanteenStaff"/>
        </div>
        <div class="column is-4">
            <p class="text1 has-text-link">
                New Canteen Staff
            </p>
        </div>
        <div class="column is-3 ml-6">
            <Discard link="../CanteenStaff"/>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12"></div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Full Name
            </p>
            <input class="pText input is-rounded" type="text" bind:value={staff.staffFullName} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Contact No.
            </p>
            <input class="pText input is-rounded" type="text" bind:value={staff.staffContactNumber} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Username
            </p>
            <input class="pText input is-rounded" type="text" bind:value={staff.staffUsername} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Password
            </p>
            <input class="pText input is-rounded" type="password" bind:value={staff.staffPassword} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Position
            </p>
            <select bind:value={staff.staffPosition} class="pText input is-rounded">
                {#each positions as pos}
                    <option value={pos.value}>
                        {pos.position}
                    </option>
                {/each}
            </select>
        </div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
    </div>
    <!-- Add record button -->
    <div class="mb- has-text-centered">
        <button class="btn-txt button {adding ? 'is-loading' : ''} is-link is-rounded" on:click={addStaffToDatabase}>Add Canteen Staff</button>
    </div>
</div>

<style>
    .text1 {
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
        color: red;
    }
</style>