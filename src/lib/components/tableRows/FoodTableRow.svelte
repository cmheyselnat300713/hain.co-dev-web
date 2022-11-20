<script>
    import ButtonEditTable from "../buttons/ButtonEditTable.svelte";

    export let num
    export let productName
    export let price
    export let type
    export let code
    export let link
</script>

<tbody>
    <tr class="text is-clickable">
        <th>{num}</th>
        <td>{productName}</td>
        <td>{parseFloat(price).toFixed(2)}</td>
        <td>{type}</td>
        <td>{code}</td>
        <td><ButtonEditTable link={link}/></td>
    </tr>
</tbody>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 17px;
    }
</style>