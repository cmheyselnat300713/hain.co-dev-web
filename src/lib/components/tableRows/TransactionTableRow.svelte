<script>
    import moment from "moment/moment.js";
    import { goto } from "$app/navigation";

    export let id;
    export let agent;
    export let description;
    export let type;
    export let amount;
    export let date;
    const oldTimeString = moment(date).format("MM-DD-YYYY h:mma");
</script>

<tbody>
    <tr on:click={() => {
        goto(`Transaction/TransactionInfo?no=${id}&agent=${agent}&desc=${description}&amount=${amount}&type=${type}&date=${oldTimeString}`)
    }} class="text is-clickable">
        <th>{id}</th>
        <td>{agent}</td>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{type}</td>
        <td>{oldTimeString}</td>
    </tr>
</tbody>

<style>
    .text {
        font-family: 'Montserrat', sans serif;
        font-size: 17px;
    }
</style>