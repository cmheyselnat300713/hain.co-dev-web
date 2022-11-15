<script>
    import ButtonEditTable from "../buttons/ButtonEditTable.svelte";

    export let num
    export let name
    export let customerLastName
    export let email
    export let link
</script>

<tbody>
    <tr class="text is-clickable">
        <th>{num}</th>
        <td>{name}</td>
        <td>{customerLastName}</td>
        <td>{email}</td>
        <td><ButtonEditTable link={link}/></td>
    </tr>
</tbody>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 17px;
    }
</style>