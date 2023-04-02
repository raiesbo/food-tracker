import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { Restaurant } from "@/types";
import { CssBaseline } from "@mui/material";
import { Category } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import styles from './restaurantDetails.module.scss';

const { restaurantService, categoriesService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.params as { restaurantId: string };

    const { result: restaurant, error } = await restaurantService.getRestaurant({ query: { restaurantId } });

    const {
        result: categories,
        error: getAllCategoriesError
    } = await categoriesService.getAllCategories();

    if (error || getAllCategoriesError) return {
        props: { restaurants: [], categories: [] }
    }

    return {
        props: {
            restaurant,
            categories
        }
    }
}

type Props = {
    restaurant: Restaurant,
    categories: Array<Category>
}


export default function RestaurantDetailsPage({ restaurant, categories }: Props) {
    console.log({ restaurant, categories })
    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <CssBaseline />
                <h1>
                    {restaurant.name}
                </h1>
                <div>
                    {restaurant.description}
                </div>
            </main>
        </>
    )
}