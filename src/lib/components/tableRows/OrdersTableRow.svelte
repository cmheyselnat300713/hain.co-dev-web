<script>
    import axios from '$lib/api/index';
    import { notifs } from '$lib/stores/notificationStore';
    export let productCode
    export let customerEmail
    export let orderRequest
    export let orderDate
    export let staffUsername
    export let orderStatus
    export let orderNumber

    let newStatus;
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
</script>

<tbody>
    <tr class="text is-clickable">
        <th>{orderNumber}</th>
        <th>{productCode}</th>
        <th>{customerEmail}</th>
        <th>{orderRequest}</th>
        <th>{new Date(orderDate).toLocaleString()}</th>
        <th>{staffUsername}</th>
        <td>
            <div class="select {updating ? 'is-loading' : ''} is-small">
                <select bind:value={newStatus}
                        on:change={updateOrderStatus}>
                    {#if orderStatus === 1}
                        <option selected disabled>INCOMING</option>
                    {:else if orderStatus === 2}
                        <option selected disabled>UNFULFILLED</option>
                    {:else if orderStatus === 3}
                        <option selected disabled>PROCESSING</option>
                    {:else if orderStatus === 4}
                        <option selected disabled>READY</option>
                    {:else if orderStatus === 5}
                        <option selected disabled>FULFILLED</option>
                    {/if}
                    <option value="1">INCOMING</option>
                    <option value="2">UNFULFILLED</option>
                    <option value="3">PROCESSING</option>
                    <option value="4">READY</option>
                    <option value="5">FULFILLED</option>
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