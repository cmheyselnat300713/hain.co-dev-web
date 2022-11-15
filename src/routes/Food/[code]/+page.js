import axios from "$lib/api/index";

export async function load({ params }) {
	try {
		const productCode = params.code;
		const product = await axios.get(`/product/${productCode}`);
		const oldProductCode = product.data.product.product_code;
		console.log(product);
		return {
      product,
      oldProductCode,
		};
	} catch (e) {
		return {
			error: new Error("Can't fetch the food information"),
		};
	}
}
