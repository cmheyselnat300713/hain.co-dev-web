<script lang="ts">
    import moment from "moment";

    export let productCode      : string
    export let customerEmail    : string
    export let orderRequest     : string
    export let orderDate        : Date
    export let staffUsername    : string
    export let orderStatus      : number
    export let orderNumber      : number

    const oldTimeString = moment(orderDate).subtract(8, "hours").format("MM-DD-YYYY h:mma");
</script>

<tbody>
<tr class="text">
    <th>{orderNumber}</th>
    <th>{productCode}</th>
    <th>{customerEmail}</th>
    <th>{orderRequest}</th>
    <th>{oldTimeString}</th>
    <th>{staffUsername}</th>
    <th>
        {orderStatus}
    </th>
</tr>
</tbody>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 17px;
    }
</style>