import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { paths } from "@/utils/paths";
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import AddIcon from '@mui/icons-material/Add';
import { Container, CssBaseline, IconButton } from "@mui/material";
import { Restaurant } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

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

export default function MyRestaurants({ restaurants }: Props) {

    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    My Restaurants Page
                </div>
                <div>
                    {restaurants.map(restaurant => (
                        <div key={restaurant.name}>
                            <p>{restaurant.name}</p>
                            <p>{restaurant.description}</p>
                        </div>
                    ))}
                    <div>
                        <Link href={paths.createNewRestaurant}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    )
}