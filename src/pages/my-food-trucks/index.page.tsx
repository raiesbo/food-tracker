import { InfoSection } from '@/components/InfoSection';
import { MyFoodTruckCategories } from '@/components/MyFoodtruck';
import MyFoodTruckList from '@/components/MyFoodtruck/MyFoodTruckList';
import services from "@/services";
import { Category, Restaurant } from '@/types';
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from '@prisma/client';
import { GetServerSidePropsContext } from "next";
import styles from './MyFoodTrucks.module.scss';

const { restaurantService, categoriesService } = services;

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

    const {
        result: categories,
        error: categoriesError
    } = await categoriesService.getCategoriesByUserId(metadata.user_id);

    if (getRestaurantsError || categoriesError) return {
        props: { restaurants: [], categories: [] }
    };

    return {
        props: { restaurants, categories, userId: metadata?.user_id }
    };
}

type Props = {
    restaurants: Array<Restaurant>
    categories: Array<Category>
    userId: User['id']
}

export default function MyRestaurants({ restaurants, categories, userId }: Props) {

    return (
        <div className={styles.root}>
            <h1>
                My Food Trucks
            </h1>
            <MyFoodTruckList restaurants={restaurants} />
            <div className={styles.bottonSection}>
                <MyFoodTruckCategories
                    categories={categories}
                    userId={userId}
                />
                <InfoSection title='Events'>
                    {'Coming soon...'}
                </InfoSection>
            </div>
        </div>
    );
}
