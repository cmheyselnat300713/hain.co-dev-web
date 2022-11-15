<script>
    import NavbarWithSearch from "$lib/components/navbars/NavbarWithSearch.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import TransactionTableRow from "$lib/components/tableRows/TransactionTableRow.svelte";
    import {audits} from "$lib/stores/transactionStore";
    import TableLoadingScreen from "$lib/components/otherComponents/TableLoadingScreen.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    onMount(async () => {
        if (!localStorage.getItem("admin")) {
            await goto("/");
        }
    })

    const binderLink = "https://mybinder.org/v2/gh/rence-salaveria/reports-py/cffd3464bcbe54164a77eda53fa6113f1fac56b3?urlpath=lab%2Ftree%2Freports.ipynb"

    let recordNumber = 1;
    const counter = number => {
        return recordNumber++;
    }

    const identifyType = (code) => {
        switch (code) {
            case 1:
                return "ORDER"

            case 2:
                return "BUY"

            case 3:
                return "ADMIN/STAFF"
        }
    }
</script>

<NavbarWithSearch/>
<NotificationContainer />

<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4 has-text-centered">
            <ButtonBack link="Database"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Transactions
            </p>
        </div>
        <div class="column is-4 has-text-centered">
            <!-- svelte-ignore security-anchor-rel-noreferrer -->
            <a href="{binderLink}" target="_blank">
                <button class="button is-rounded is-link btn-txt">
                    <img class="img1" src="images/transactionIcon.png" alt="back"/>
                    <p class="ml-3">
                        Open Records
                    </p>
                </button>
            </a>
        </div>
    </div>

    <div class="column is-10 is-offset-1 pl-5 pt-0">
        <table class="table is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>No.</th>
                <th>Agent</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
            </tr>
            </thead>

            {#await $audits}
                <TableLoadingScreen/>
            {:then audit}
                {#each audit as info}
                <TransactionTableRow
                    id={counter()}
                    agent={info.transaction_agent}
                    description={info.transaction_description}
                    amount={info.transaction_amount}
                    type={identifyType(info.transaction_type)}
                    date={info.transaction_date}/>
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

    .btn-txt {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
    }

    .img1 {
        width: 20px;
    }
</style>