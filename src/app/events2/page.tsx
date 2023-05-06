import getUser from "@/utils/getUser";
import { auth0Config } from "@/utils/settings";
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

export default async function EventsPage() {
	const user = await getUser({ redirectUrl: '/events' });
	const userId = user[auth0Config.metadata]?.user_id;
	const {
		result: restaurants,
		error
	} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(userId);

	console.log({ restaurants, error });

	return (
		<div>
			Events 2
		</div>
	);
}
