import axios from "$lib/api/index";

export async function load({ params }) {
	try {
		const username = params.username;
		const canteenStaff = await axios.get(`/staff/auth/${username}`);
		const oldUsername = canteenStaff.data.staffDetails.staff_username;
		console.log(canteenStaff);
		return {
      canteenStaff: canteenStaff.data.staffDetails,
      oldUsername,
		};
	} catch (e) {
		return {
			error: new Error("Can't fetch the canteen staff"),
		};
	}
}
