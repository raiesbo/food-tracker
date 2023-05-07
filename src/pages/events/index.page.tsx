import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import { Events } from "@/components/Events";
import { ReactElement } from "react";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context.req, context.res);
	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const {
		result: restaurants,
		error
	} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(Number(userId));

	return {
		props: {
			restaurants: error ? [] : restaurants
		}
	};
};

type Props = {
	restaurants: Array<RestaurantWithEvents>
}

EventsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

export default function EventsPage({ restaurants }: Props) {
	return (
		<Events restaurants={restaurants}/>
	);
}
