<script>
    export let click;
    export let link = "";
</script>

<div>
    <a href="{link}" on:click={click}>
        <button class="btn-txt button is-link is-rounded"> <!-- dito kaya sa button yung on:click={click} or sa anchor? -->
            <img class="img2" src="/images/add.png" alt="Add record"/>
            <p class="ml-2">
                Add Record
            </p>
        </button>
    </a>
</div>

<style>
    .img2 {
        width: 30px;
    }

    .btn-txt {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
    }
</style>
