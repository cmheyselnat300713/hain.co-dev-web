<script>
// @ts-nocheck

    import NavbarWithSearch from "$lib/components/navbars/NavbarWithSearch.svelte";
    import CustomersTableRow from "$lib/components/tableRows/CustomersTableRow.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonAddRecord from "$lib/components/buttons/ButtonAddRecord.svelte";
    import {customers} from "$lib/stores/customerStores";
    import TableLoadingScreen from "$lib/components/otherComponents/TableLoadingScreen.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    onMount(async () => {
        if (!localStorage.getItem("admin")) {
            await goto("/");
        }
    })

    let itemNumber = 1;
    const counter = () => {
        return itemNumber++;
    }
</script>

<NavbarWithSearch />
<NotificationContainer />

<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4">
            <ButtonBack link="Database" />
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Customers
            </p>
        </div>
        <div class="column is-3 ml-6">
            <ButtonAddRecord link="Customers/AddNewCustomer" />
        </div>
    </div>

    <div class="column is-10 is-offset-1 pl-5 pt-0">
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            {#await $customers}
                <TableLoadingScreen/>
            {:then customer}
                {#each customer as info}
                    <!--TODO add property for the link for the individual product-->
                    <CustomersTableRow
                        num={counter()}
                        name={info.customer_first_name}
                        customerLastName={info.customer_last_name}
                        email={info.customer_email}
                        link={`/Customers/${info.customer_email}`}/>
                {/each}
            {:catch err}
                <p>{err.message}</p>
            {/await}
        </table>
    </div>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 40px;
    }

    table {
        font-family: 'Montserrat', sans serif;
        font-size: 20px;
    }
</style>