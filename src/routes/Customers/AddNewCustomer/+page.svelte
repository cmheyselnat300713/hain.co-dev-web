<script lang="ts">
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import axios from "$lib/api";
    import {goto} from "$app/navigation";
    import { notifs } from "$lib/stores/notificationStore";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";
    import validators from "$lib/validators";

    let customer = {
        customerFirstName: null,
        customerLastName: null,
        customerPassword: null,
        customerEmail: null,
        customerGcashNumber: null,
        customerGcashName: null,
        customerIsActive: true
    };
    let adding = false

    const addCustomerToDatabase = async () => {
        let msg = ''
        let error = false
        let errorCounter = 0
        Object.keys(customer).map((prop, i) => {
            if(!customer[prop]) {
                errorCounter++
                error = true
                msg = !msg.length ? `${prop.split('customer').join('')}` : `${msg}, ${prop.split('customer').join('')}`
            }
        })
        msg += ` ${errorCounter > 1 ? 'are' : 'is a'} reqiured field${errorCounter > 1 ? 's' : ''}`

        if(error) {
            $notifs = [...$notifs, {
                msg,
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isEmailValid(customer.customerEmail)) {
            $notifs = [...$notifs, {
                msg: 'Email is invalid',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!validators.isPassValid(customer.customerPassword)) {
            $notifs = [...$notifs, {
                msg: 'Password does not meet the criteria for the security',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(validators.containsLettersAndCharacters(customer.customerGcashNumber)) {
            $notifs = [...$notifs, {
                msg: 'Gash number cannot have a letter or special characters',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(customer.customerGcashNumber.length != 11) {
            $notifs = [...$notifs, {
                msg: 'Gash number must be exactly 11 numbers e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        if(!customer.customerGcashNumber.substring(0, 2).match('09')) {
            $notifs = [...$notifs, {
                msg: 'Gcash number must be start with 09 e.g 09xx-xxx-xxxx',
                type: 'error',
                id: `${(Math.random() * 99) + 1}${new Date().getTime()}`
            }]
            return
        }

        try {
            adding = true
            let response = await axios.post('/customer/createCustomer', customer);
            // console.log(response);
            if(response.status == 200 || response.status == 201) {
                adding = false
                $notifs = [...$notifs, {
                    msg: `New canteen customer: ${customer.customerFirstName} ${customer.customerLastName} (${customer.customerEmail})`,
                    type: 'error',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
                goto("../Customers");
            }else{
                adding = false
                $notifs = [...$notifs, {
                    msg: `Error in adding a new customer but with a response status of ${response.status}`,
                    type: 'error',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
            }
        } catch (e) {
            adding = false
            $notifs = [...$notifs, {
                msg: `Error in adding a new customer`,
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
            <ButtonBack link="../Customers"/>
        </div>
        <div class="column is-4">
            <p class="text1 has-text-link">
                New Customer
            </p>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12"></div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> First Name
            </p>
            <input class="pText input is-rounded" type="text" bind:value={customer.customerFirstName} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Last Name
            </p>
            <input class="pText input is-rounded" type="text" bind:value={customer.customerLastName} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Email Address
            </p>
            <input class="pText input is-rounded" type="email" bind:value={customer.customerEmail} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Password
            </p>
            <input class="pText input is-rounded" type="password" title="6 or more characters" bind:value={customer.customerPassword} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Gcash Name
            </p>
            <input class="pText input is-rounded" type="text" bind:value={customer.customerGcashName} required/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Gcash Number
            </p>
            <input class="pText input is-rounded" type="email" bind:value={customer.customerGcashNumber} required/>
        </div>
        <div class="column is-12"></div>
    </div>
    <!-- Add record button -->
    <div class="mb- has-text-centered">
        <button class="btn-txt button {adding ? 'is-loading' : ''} is-link is-rounded" type="submit" on:click={addCustomerToDatabase}>Add Customer</button>
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