import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./Orders.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import RestaurantWithOrders from "@/types/RestaurantWithOrders";
import { OrdersTable } from "@/components/Orders";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context.req, context.res);
    const userId = session && session?.user[auth0Config.metadata]?.userId;

    const { result: restaurants, error } = await ordersServiceInstance.getRestaurantsWithOrders(userId);

    return { props: { restaurants } };
};

type Props = {
    restaurants: Array<RestaurantWithOrders>
}

export default function Orders({ restaurants }: Props) {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'My Orders'} ></PageHeader>
                {/*{restaurants.map(restaurant => {*/}
                {/*    return (*/}
                {/*        <OrdersTable*/}
                {/*            key={restaurant.id}*/}
                {/*            restaurant={restaurant}*/}
                {/*        />*/}
                {/*    );*/}
                {/*})}*/}
            </div>
        </LayoutWithSideBar>
    );
}
