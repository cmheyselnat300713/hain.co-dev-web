import axios from "$lib/api/index";

export async function load({ fetch, params }) {
	try {
		const username = params.username;
		const admin = await axios.get(`/admin/auth/${username}`);
		// const oldUsername = admin.data.adminDetails.adminUsername
		console.log(admin);
		return {
      admin: admin.data.adminDetails,
      oldUsername: username,
		};
	} catch (e) {
		return {
			error: new Error("Can't fetch the admin"),
		};
	}
}
