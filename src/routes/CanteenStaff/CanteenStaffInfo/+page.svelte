<script>
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import ButtonEdit from "$lib/components/buttons/ButtonEdit.svelte";
    import FieldWithValue from "$lib/components/otherComponents/FieldWithValue.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
</script>

<NavbarSolo/>

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
            <ButtonEdit link="EditCanteenStaffInfo"/>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <FieldWithValue name="Name" value="Salaveria, Rence" isReadOnly={true}/>
        <FieldWithValue name="Position" value="Cook" isReadOnly={true}/>
        <div class="column is-12"></div>
        <FieldWithValue name="Contact No." value="09123456789" isReadOnly={true}/>
        <FieldWithValue name="Address" value="02 Toronto St. Malinta Valenzuela City" isReadOnly={true}/>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
        <div class="column is-12"></div>
    </div>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
    }
</style>