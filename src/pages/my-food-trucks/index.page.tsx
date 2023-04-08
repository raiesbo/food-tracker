import MyFoodTruckList from '@/components/MyFoodtruck/MyFoodTruckList';
import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { Restaurant } from '@/types';
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { CssBaseline } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import styles from './MyFoodTrucks.module.scss';

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const session = await getSession(context.req, context.res);

    const metadata = session?.user && session?.user[auth0Config.metadata] as {
        role: 'SP' | 'CUSTOMER',
        user_id: string
    };

    if (!metadata?.user_id) return {
        props: { restaurants: [] }
    }

    const {
        result: restaurants,
        error: getRestaurantsError
    } = await restaurantService.getAllRestaurantByUser(metadata.user_id)

    if (getRestaurantsError) return {
        props: { restaurants: [] }
    }

    return {
        props: { restaurants }
    }
}

type Props = {
    restaurants: Array<Restaurant>
}

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80';

export default function MyRestaurants({ restaurants }: Props) {

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <CssBaseline />
                <h1>
                    My Restaurants
                </h1>
                <MyFoodTruckList restaurants={restaurants} />
            </main>
        </>
    )
}