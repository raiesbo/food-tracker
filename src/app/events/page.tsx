import { Events } from '@/components/Events';
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

export default async function EventsPage() {
	const {
		result: restaurants,
		error
	} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(804929);

	console.log({ restaurants, error });

	return (
		<Events
			restaurants={
				(error ? [] : restaurants) as unknown as Array<RestaurantWithEvents>
			}
		/>
	);
}
