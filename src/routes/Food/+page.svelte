<script>
    //@ts-nocheck
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonAddRecord from "$lib/components/buttons/ButtonAddRecord.svelte";
    import FoodTableRow from "$lib/components/tableRows/FoodTableRow.svelte";
    import {products} from "$lib/stores/productStore";
    import TableLoadingScreen from "$lib/components/otherComponents/TableLoadingScreen.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
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
    const identifyType = (code) => {
        switch (code) {
            case 1:
                return "Breakfast"

            case 2:
                return "Lunch"

            case 3:
                return "Dessert"

            case 4:
                return "Extra"
        }
    }
</script>
<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4">
            <ButtonBack link="Database"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Food
            </p>
        </div>
        <div class="column is-3 ml-6">
            <ButtonAddRecord link="Food/AddNewFood"/>
        </div>
    </div>

    <div class="column is-10 is-offset-1 pl-5 pt-0">
        <table class="table is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Product Code</th>
                <th></th>
            </tr>
            </thead>
            <!-- Temporary placeholders:
                    Product name - name
                    Price - phone
                    Type - username -->
            {#await $products}
                <TableLoadingScreen/>
            {:then food}
                {#each food as product}
                    <FoodTableRow
                        num={counter()}
                        productName={product.product_name}
                        price={product.product_price}
                        type={identifyType(product.product_type)}
                        code={product.product_code}
                        link={`/Food/${product.product_code}`}/>
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