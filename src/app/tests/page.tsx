import getUser from "@/utils/getUser";

export default async function EventsPage() {
	const user = await getUser({ redirectUrl: '/events' });

	console.log({ user });

	return (
		<div>
			USER
		</div>
	);
}
