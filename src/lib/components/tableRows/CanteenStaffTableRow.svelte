<script>
    import ButtonEditTable from "../buttons/ButtonEditTable.svelte";

    export let num
    export let name
    export let position
    export let contactNum
    export let link
</script>

<tbody>
    <tr class="text">
        <th>{num}</th>
        <td>{name}</td>
        <td>{position}</td>
        <td>{contactNum}</td>
        <td><ButtonEditTable link={link}/></td>
    </tr>
</tbody>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 17px;
    }
</style>