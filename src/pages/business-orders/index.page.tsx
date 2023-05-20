import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./BusinessOrders.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";
import RestaurantWithOrders from "@/types/RestaurantWithOrders";
import { OrdersTable } from "@/components/Orders";
import { Text } from '@/components/Text';
import { ReactElement } from "react";
import User from "@/types/User";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);
	const userId = session && session?.user[auth0Config.metadata]?.user_id;

	if (!userId) {
		return { props: { restaurants: [], userId } };
	}

	const {
		result: restaurants,
		error
	} = await ordersServiceInstance.getRestaurantsWithOrders(userId);

	return {
		props: {
			restaurants: error ? [] : restaurants,
			userId
		}
	};
};

BusinessOrdersPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	restaurants: Array<RestaurantWithOrders>,
	userId: User['id']
}

export default function BusinessOrdersPage({ restaurants, userId }: Props) {
	const withOrders = restaurants.some(restaurant => restaurant.orders.length > 0);

	return (
		<div className={styles.root}>
			<PageHeader title={'Food Truck Orders'}></PageHeader>
			{withOrders ? (
				restaurants?.map(restaurant => {
					return restaurant.orders.length > 0 && (
						<div key={restaurant.id} className={styles.tableContainer}>
							<Text bold variant='h3'>
								{restaurant.name}
							</Text>
							<OrdersTable
								key={restaurant.id}
								fetchedOrders={restaurant.orders}
								userId={userId}
							/>
						</div>
					);
				})
			) : (
				<Text>
					No orders found
				</Text>
			)}
		</div>
	);
}
