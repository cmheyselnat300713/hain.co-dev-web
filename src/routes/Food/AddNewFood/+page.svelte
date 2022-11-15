<script>
    import Discard from "$lib/components/buttons/Discard.svelte";
    import NavbarSolo from "$lib/components/navbars/NavbarSolo.svelte";
    import ButtonBack from "$lib/components/buttons/ButtonBack.svelte";
    import axios from "$lib/api/index";
    import {goto} from "$app/navigation";
    import uploadImageToAPI from "../../../lib/helper/uploadImageToAPI.js";
    import { notifs } from "$lib/stores/notificationStore";
    import NotificationContainer from "$lib/components/systemNotification/notification-container.svelte";

    let product = {
        productCode: "",
        productName: "",
        productDescription: "",
        productPrice: 0,
        productIsActive: true,
        productImage: "",
        productType: 1
    }

    let selectedImage;
    let adding = false

    let types = [
        {value: 1, type: "BREAKFAST"},
        {value: 2, type: "LUNCH"},
        {value: 3, type: "DESSERT"},
        {value: 4, type: "EXTRA"}
    ]

    const addProductToDatabase = async () => {
        let msg = 'Product '
        let errors = 0
        Object.keys(product).map(prop => {
            if(prop === 'productPrice') {
                if(product[prop] <= 0) {
                    msg += !errors ? `${prop.split('product').join('')}` : `, ${prop.split('product').join('')}`
                    errors++
                }
            }
            if(prop !== 'productIsActive' && prop !== 'productType' && prop !== 'productPrice') {
                if(!product[prop]) {
                    msg += !errors ? `${prop.split('product').join('')}` : `, ${prop.split('product').join('')}`
                    errors++
                }
            }
        })
        msg += errors ? ' are a required fields' : ' is a required field'

        if(errors) {
            $notifs = [...$notifs, {
                msg,
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            return
        }

        try {
            adding = false
            product.productImage = await uploadImageToAPI(selectedImage);
            // console.log(product.productImage);
            let response = await axios.post('/product/createProduct', product)
            if(response.status == 200 || response.status == 201) {
                adding = false
                $notifs = [...$notifs, {
                    msg: `New canteen product: ${product.productName} (${product.productCode})`,
                    type: 'success',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
                await goto("../Food")
            }else{
                adding = false
                $notifs = [...$notifs, {
                    msg: `Error in adding new product but has a response status of ${response.status}`,
                    type: 'error',
                    id: `${Math.random() * 99}${new Date().getTime()}`
                }]
            }
            // console.log(response)
            // alert("Product Added Successfully")
        } catch (e) {
            adding = false
            $notifs = [...$notifs, {
                msg: `Error in adding new product`,
                type: 'error',
                id: `${Math.random() * 99}${new Date().getTime()}`
            }]
            console.log(e)
        }
    }

    function onImageSelect(e) {
        selectedImage = e.target.files[0]
        product.productImage = selectedImage
        // console.log(selectedImage)
    }
</script>

<NavbarSolo/>
<NotificationContainer />

<div class="container">
    <div class="columns  pt-5 is-multiline has-text-centered">
        <div class="column is-4">
            <ButtonBack link="../Food"/>
        </div>
        <div class="column is-4">
            <p class="text has-text-link">
                New Product
            </p>
        </div>
        <div class="column is-3 ml-6">
            <Discard link="../Food"/>
        </div>
    </div>

    <div class="columns pt-5 is-multiline">
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Name
            </p>
            <input class="pText input is-rounded" type="text" bind:value={product.productName}/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Price
            </p>
            <input min={0} class="pText input is-rounded" type="number" bind:value={product.productPrice}/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Type
            </p>
            <select bind:value={product.productType} class="pText input is-rounded">
                {#each types as pos}
                    <option value={pos.value}>
                        {pos.type}
                    </option>
                {/each}
            </select>
        </div>
        <!-- TODO make sure unique -->
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Code
                <br>
                <span class="note">You cannot modify product code once set</span>
            </p>
            <input class="pText input is-rounded" type="text" bind:value={product.productCode}/>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Description
            </p>
            <textarea class="pText input tall-textarea" bind:value={product.productDescription}></textarea>
        </div>
        <div class="column is-3 is-offset-2">
            <p class="pText has-text-link ml-4 mb-1">
                <span>*</span> Product Image
            </p>
            <input class="pText input is-rounded"
                   type="file"
                   accept="image/*"
                   on:change={onImageSelect}/>
        </div>
    </div>
    <div class="has-text-centered">
        <div class="mb- has-text-centered">
            <button class="btn-txt button {adding ? 'is-loading' : ''} is-link is-rounded" on:click={addProductToDatabase}>Add Product</button>
        </div>
    </div>

    <div class="column is-12"></div>
</div>

<style>
    .text {
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
    }

    .pText {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
    }

    .btn-txt {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
    }

    .tall-textarea {
        height: 18rem;
        border-radius: 20px;
    }

    span {
        color: red
    }

    .note {
        color: gray;
        display: block;
        font-size: 13px;
    }
</style>