import LayoutWithSideBar from '@/components/Layout/LayoutWithSideBar';
import { MyFoodTruckList } from '@/components/MyFoodtruck';
import services from "@/services";
import { Restaurant } from '@/types';
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from '@prisma/client';
import { GetServerSidePropsContext } from "next";
import styles from './MyFoodTrucks.module.scss';
import { PageHeader } from "@/components/PageHeader";
import { ReactElement } from "react";

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context.req, context.res);

	const metadata = session?.user && session?.user[auth0Config.metadata] as {
		role: 'SP' | 'CUSTOMER',
		user_id: number
	};

	if (!metadata?.user_id) return {
		props: { restaurants: [], categories: [] }
	};

	const {
		result: restaurants,
		error: getRestaurantsError
	} = await restaurantService.getAllRestaurantByUser(metadata.user_id);

	if (getRestaurantsError) return {
		props: { restaurants: [] }
	};

	return {
		props: { restaurants, userId: metadata?.user_id }
	};
}

MyFoodTrucksPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	restaurants: Array<Restaurant>
	userId: User['id']
}

export default function MyFoodTrucksPage({ restaurants, userId }: Props) {
	return (
		<div className={styles.root}>
			<PageHeader title={'My Food Trucks'}></PageHeader>
			<MyFoodTruckList restaurants={restaurants}/>
		</div>
	);
}
