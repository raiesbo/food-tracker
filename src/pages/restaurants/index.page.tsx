import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { paths } from "@/utils/paths";
import { Card, Container, CssBaseline } from "@mui/material";
import { Restaurant } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query as { city: string, category: string };

    let filters = {}

    if (query.category) {
        filters = {
            ...filters,
            category: {
                is: {
                    name: query.category
                }
            }
        }
    }

    if (query.city) {
        filters = {
            ...filters,
            locations: {
                some: {
                    city: query.city
                }
            }
        }
    }

    const { result: restaurants, error } = await restaurantService.getAllRestaurantByFilter(filters);

    if (error) return {
        props: { restaurants: [] }
    }

    return {
        props: { restaurants }
    }
}

type Props = {
    restaurants: Array<Restaurant>
}

export default function RestaurantPage({ restaurants }: Props) {

    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    Restaurant Page
                </div>
                <div>
                    {restaurants?.map(restaurant => (
                        <Card key={restaurant.id}>
                            <Link href={`${paths.restaurants}/${restaurant.id}`}>
                                {restaurant.name}
                            </Link>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )
}