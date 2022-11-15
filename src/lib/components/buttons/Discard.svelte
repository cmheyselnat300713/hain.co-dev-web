<script lang="ts">
    export let link: string = " ";
</script>

<a href="{link}">
    <button class="btn-txt button is-danger is-rounded">
        <img class="discard" src="/images/delete.png" alt="back"/>
        <p class="ml-3">
            Discard
        </p>
    </button>
</a>

<style>
    .discard {
        width: 20px;
    }

    .btn-txt {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
    }
</style>
