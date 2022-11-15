<script lang="ts">
    export let productCode    
    export let customerEmail  
    export let orderRequest   
    export let orderDate      
    export let staffUsername  
    export let orderStatus    
    export let orderNumber    
</script>

<tbody>
    <tr class="text is-clickable">
        <th>{orderNumber}</th>
        <th>{productCode}</th>
        <th>{customerEmail}</th>
        <th>{orderRequest}</th>
        <th>{new Date(orderDate).toLocaleString()}</th>
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