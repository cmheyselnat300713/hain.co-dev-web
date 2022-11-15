<script>
// @ts-nocheck

    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonEdit from "$lib/components/buttons/ButtonEdit.svelte";
    import ButtonSwitch from "$lib/components/buttons/ButtonSwitch.svelte";
    import FieldWithValue from "$lib/components/otherComponents/FieldWithValue.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns  pt-5 is-multiline has-text-centered">
        <div class="column is-4">
            <ButtonBack link="../Customers"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link">
                Customer's Information
            </p>
        </div>
        <div class="column is-3 ml-6">
            <ButtonEdit link="EditCustomerInfo"/>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12"></div>
        <FieldWithValue name="Name" value="Swift, Taylor" isReadOnly={true}/>
        <FieldWithValue name="Contact No." value="09123456789" isReadOnly={true}/>
        <div class="column is-12"></div>
        <FieldWithValue name="Email" value="taylorswift@gmail.com" isReadOnly={true}/>
        <FieldWithValue name="Password" value="*****" isReadOnly={true}/>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
    </div>
</div>

<div class="columns is-centered has-text-link pb-6">
    <p class="switch-labels mt-3 mr-4">Inactive</p>
    <ButtonSwitch/>
    <p class="switch-labels mt-3 ml-4">Active</p>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
    }

    .switch-labels {
        font-family: 'Montserrat', sans-serif;
        font-size: 25px;
    }
</style>