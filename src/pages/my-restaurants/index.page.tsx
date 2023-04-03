import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { paths } from "@/utils/paths";
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import AddIcon from '@mui/icons-material/Add';
import { Card, CssBaseline } from "@mui/material";
import { Restaurant } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from './myRestaurants.module.scss';

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
                <div className={styles.listContainer}>
                    {restaurants.map(restaurant => (
                        <Card
                            key={restaurant.id}
                            className={styles.card}
                        >
                            <Link
                                href={'/my-restaurants/' + restaurant.id}
                                className={styles.cardLink}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={imagePlaceholder}
                                        alt='Restaurant image'
                                        fill
                                        className={styles.backgroundImage}
                                    />
                                </div>
                                <div className={styles.cardText}>
                                    <h3 className={styles.name}>
                                        {restaurant.name}
                                    </h3>
                                    <p className={styles.description}>
                                        {restaurant.description}
                                    </p>
                                </div>
                            </Link>
                        </Card>
                    ))}
                    <Card
                        className={styles.card}
                        title='Create a new Restaurant'
                    >
                        <Link
                            href={paths.createNewRestaurant}
                            className={styles.cardLinkPlus}
                        >
                            <AddIcon />
                        </Link>
                    </Card>
                </div>
            </main>
        </>
    )
}