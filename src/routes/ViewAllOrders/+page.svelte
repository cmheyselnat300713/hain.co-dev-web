<script>
    //@ts-nocheck
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import NavbarWithSearch from "$lib/components/navbars/NavbarWithSearch.svelte";
    import TableLoadingScreen from "$lib/components/otherComponents/TableLoadingScreen.svelte"
    import {orders} from "$lib/stores/orderStore";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import AllOrdersTableRow from "$lib/components/tableRows/AllOrdersTableRow.svelte";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    onMount(async () => {
        if (!localStorage.getItem("admin")) {
            await goto("/");
        }
    })

    let orderNumber = 1;
    const counter = () => (
        orderNumber++
    )

    const identifyType = (code) => {
        switch(code) {
            case 1:
                return "Incoming"

            case 2:
                return "Unfulfilled"

            case 3:
                return "Processing"

            case 4:
                return "Ready"

            case 5:
                return "Fulfilled"
        }
    }

    const identifyPaymentMethod = (code) => {
        switch(code) {
            case 1:
                return "CASH"

            case 2:
                return "GCASH"
        }
    }
</script>

<NavbarWithSearch/>
<NotificationContainer />

<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4 has-text-centered">
            <ButtonBack link="Orders"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Orders
            </p>
        </div>
    </div>

    <div class="column is-10 is-offset-1 pl-5 pt-0">
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Customer Email</th>
                    <th>Order Request</th>
                    <th>Order Date</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
                </tr>
            </thead>
            {#await $orders}
                <TableLoadingScreen/>
            {:then order}
                {#each order as info}
                    <AllOrdersTableRow
                        productCode={info.order_product_code}
                        customerEmail={info.order_customer_email}
                        orderRequest={info.order_requests}
                        orderDate={info.order_date}
                        staffUsername={identifyPaymentMethod(info.order_payment_method)}
                        orderStatus={identifyType(info.order_status)}
                        orderNumber={counter()}/>
                {/each}
            {:catch err}
                <p>{err.message}</p>
            {/await}

        </table>
    </div>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
    }

    table {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
    }
</style>