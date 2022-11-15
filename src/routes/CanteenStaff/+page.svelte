<script>
    //@ts-nocheck
    import NavbarWithSearch from "$lib/components/navbars/NavbarWithSearch.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonAddRecord from "$lib/components/buttons/ButtonAddRecord.svelte";
    import CanteenStaffTableRow from "$lib/components/tableRows/CanteenStaffTableRow.svelte";
    import {staffs} from "$lib/stores/staffStore";
    import TableLoadingScreen from "$lib/components/otherComponents/TableLoadingScreen.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    onMount(async () => {
        if (!localStorage.getItem("admin")) {
            await goto("/");
        }
    })

    let staffNumber = 1;
    const counter = () => {
        return staffNumber++;
    }

    const identifyType = (code) => {
        switch(code) {
            case 1:
                return "Chef"

            case 2:
                return "Cashier"

            case 3:
                return "Server"
        }
    }
</script>

<NavbarWithSearch />
<NotificationContainer />
<div class="container">
    <div class="columns has-text-centered pt-5">
        <div class="column is-4">
            <ButtonBack link="Database"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link has-text-weight-bold">
                Canteen Staffs
            </p>
        </div>
        <div class="column is-3 ml-6">
            <ButtonAddRecord link="CanteenStaff/AddNewCanteenStaff" />
        </div>
    </div>

    <div class="column is-10 is-offset-1 pl-5 pt-0">
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Contact No.</th>
                    <th></th>
                </tr>
            </thead>
            {#await $staffs}
                <TableLoadingScreen/>
            {:then staff}
                {#each staff as info}
                    <!--TODO add property for the link for the individual staff
                        TODO add property to access the object
                    -->
                    <CanteenStaffTableRow
                        num={counter()}
                        name={info.staff_full_name}
                        position={identifyType(info.staff_position)}
                        contactNum={info.staff_contact_number}
                        link={`/CanteenStaff/${info.staff_username}`}/>
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