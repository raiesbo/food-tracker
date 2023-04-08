import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import styles from './MyFoodTrucksDetails.module.scss';

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.query;

    const {
        result: restaurant,
        error
    } = await restaurantService.getRestaurant({ query: { restaurantId } } as unknown as NextApiRequest)

    if (error) return {
        redirect: {
            permanent: true,
            destination: paths.myFoodTrucks
        }
    }

    return { props: { restaurant } }
}

type Props = {
    restaurant: Restaurant
}

export default function MyNewRestaurant({ restaurant }: Props) {

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <h1>
                    My Restaurants
                </h1>
                <div>
                    {restaurant.name}
                </div>
            </main>
        </>
    )
}
