import { Events } from '@/components/Events';
import RestaurantWithEvents from "@/types/RestaurantWithEvents";

export default async function EventsPage() {

	return (
		<Events
			restaurants={[] as unknown as Array<RestaurantWithEvents>}
		/>
	);
}
