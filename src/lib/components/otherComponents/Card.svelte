<script>
    export let name
    export let sub
    export let link = " ";
    export let imagePath;
    export let entries = " ";
</script>

<div class="column is-3 mx-5">
    <a href={link}>
        <div class="card">
            <div class="card-image is-flex is-justify-content-center pt-4">
                <img src={imagePath} alt="logo"/>
            </div>
            <div class="card-content px-4">
                <p class="text has-text-centered has-text-link">{name}</p>
                <p class="text1 has-text-centered" style="max-width: 100%; min-width: 100%; text-overflow: ellipsis; overflow: hidden;">{entries} {sub}</p>
            </div>
        </div>
    </a>
</div>

<style>
    .card {
        border: 3px solid hsl(222, 4%, 52%);
        border-radius: 20px;
    }

    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
    }

    .text1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
    }

    img {
        max-width: 130px;
    }
</style>