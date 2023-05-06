import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import { redirect } from "next/navigation";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

type Props = {
	params: {
		userId: string
	}
}
export default async function EventsPage({ params: { userId } }: Props) {
	if (!userId) {
		redirect('/');
	}

	const {
		result: restaurants,
		error
	} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(Number(userId));

	return (
		<div>
			Event
		</div>
	);
}
