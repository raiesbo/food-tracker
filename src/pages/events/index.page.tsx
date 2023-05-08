import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import { Events } from "@/components/Events";
import { ReactElement } from "react";
import { useData } from "@/utils";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context.req, context.res);
	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const {
		result: restaurants,
		error
	} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(Number(userId));

	const url = `/api/users/${userId}/events`;

	return {
		props: {
			restaurants: error ? [] : restaurants,
			url
		}
	};
}

type Props = {
	url: string,
	restaurants: Array<RestaurantWithEvents>,
}

EventsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

export default function EventsPage({ url, restaurants }: Props) {
	const { data } = useData<Array<RestaurantWithEvents>>(url, restaurants);

	return (
		<Events restaurants={data} url={url}/>
	);
}
