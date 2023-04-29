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

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);
	const userId = session && session?.user[auth0Config.metadata]?.user_id;

	if (!userId) {
		return { props: { restaurants: [] } };
	}

	const { result: restaurants } = await ordersServiceInstance
		.getRestaurantsWithOrders(userId);

	return { props: { restaurants } };
};

type Props = {
	restaurants: Array<RestaurantWithOrders>
}

export default function BusinessOrders({ restaurants }: Props) {

	return (
		<LayoutWithSideBar>
			<div className={styles.root}>
				<PageHeader title={'Food Truck Orders'}></PageHeader>
				{restaurants?.map(restaurant => {
					return restaurant.orders.length > 0 && (
						<div key={restaurant.id} className={styles.tableContainer}>
							<Text bold variant='h3'>
								{restaurant.name}
							</Text>
							<OrdersTable
								key={restaurant.id}
								fetchedOrders={restaurant.orders}
							/>
						</div>
					);
				})}
			</div>
		</LayoutWithSideBar>
	);
}
