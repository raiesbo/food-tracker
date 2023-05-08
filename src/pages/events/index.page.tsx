import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import { Events } from "@/components/Events";
import { ReactElement } from "react";
import useSWR from "swr";

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
			fallback: { [url]: error ? [] : restaurants },
			url
		}
	};
}

type Props = {
	url: string,
	fallback: { [key: string]: Array<RestaurantWithEvents> },
}

EventsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

export default function EventsPage({ url, fallback }: Props) {
	const fetcher = async (url: string) => {
		return await fetch(url).then(res => res.json()).then(({ restaurants }) => restaurants);
	};

	const { data } = useSWR((url ?? ''), fetcher, {
		revalidateOnMount: false,
		fallback: (fallback ?? null)
	});

	return (
		<Events restaurants={data} url={url}/>
	);
}
