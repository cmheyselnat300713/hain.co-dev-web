<script lang="ts">
    // OrderTableRow.svelte

    import axios from '$lib/api/index';
    import { notifs } from '$lib/stores/notificationStore';
    import moment from "moment/moment.js";
    export let productCode: string;
    export let customerEmail: string;
    export let orderRequest: string;
    export let orderDate: Date;
    export let staffUsername: string;
    export let orderStatus: number;
    export let orderNumber: number;

    $: newStatus = `${orderStatus}`;
    let updating = false

    const updateOrderStatus = async () => {
        try {
            updating = true
            const newStatusInt = parseInt(newStatus);
            const response = await axios.patch(`/order/updateOrderStatus/${orderNumber}`, {
                orderStatus: newStatusInt
            })
            if(response.status == 200) {
                $notifs = [...$notifs, {
                    msg: `Order #${orderNumber} status updated to ${newStatus == 1 ? 'INCOMING' : newStatus == 2 ? 'UNFULFILLED' : newStatus == 3 ? 'PROCESSING' : newStatus == 4 ? 'READY' : 'FULFILLED'}`,
                    type: 'success',
                    id: (Math.random() * 99) + 1
                }]
                orderStatus = newStatusInt;
            }else{
                $notifs = [...$notifs, {
                    msg: `Updating order #${orderNumber} failed`,
                    type: 'error',
                    id: (Math.random() * 99) + 1
                }]
            }
            updating = false
        } catch (e) {
            updating = false
            $notifs = [...$notifs, {
                msg: `Updating order #${orderNumber} failed`,
                type: 'error',
                id: (Math.random() * 99) + 1
            }]
            console.log(e)
        }
    }

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
    <td>
        <div class="select {updating ? 'is-loading' : ''} is-small is-{orderStatus == 1 ? 'success' : orderStatus == 2 ? 'danger': orderStatus == 3 ? 'warning' : orderStatus == 4 ? 'info' : orderStatus == 5 ? 'grey-lighter' : ''}">
            <select disabled={orderStatus == 2 || orderStatus == 5} class="{orderStatus == 1 ? 'has-background-success-light has-text-success-dark' : orderStatus == 2 ? 'has-background-danger-light has-text-danger-dark' : orderStatus == 3 ? 'has-background-warning-light has-text-warning-dark' : orderStatus == 4 ? 'has-background-info-light has-text-info-dark' : orderStatus == 5 ? 'has-background-grey-lighter has-text-grey-dark' : ''}" bind:value={newStatus}
                    on:change={updateOrderStatus}>
                <option hidden={orderStatus == 1} value="1">INCOMING</option>
                <option hidden={orderStatus == 2} value="2">UNFULFILLED</option>
                <option hidden={orderStatus == 3} value="3">PROCESSING</option>
                <option hidden={orderStatus == 4} value="4">READY</option>
                <option hidden={orderStatus == 5} value="5">FULFILLED</option>
            </select>
        </div>
    </td>
</tr>
</tbody>

<style>
    .text {
        font-size: 17px;
    }

    option, select {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
    }
</style>