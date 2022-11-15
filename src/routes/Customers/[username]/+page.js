import axios from "$lib/api/index";

export async function load({ params }) {
	try {
		const emailAddress = params.username;
		const customer = await axios.get(`/customer/auth/${emailAddress}`);
		const oldEmail = customer.data.customerDetails.customer_email;
		console.log(customer);
		return {
      customer: customer.data.customerDetails,
      oldEmail,
		};
	} catch (e) {
		return {
			error: new Error("Can't fetch the customer information"),
		};
	}
}
