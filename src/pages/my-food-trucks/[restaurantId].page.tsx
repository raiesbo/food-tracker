import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { paths } from "@/utils/paths";
import { GetServerSidePropsContext, NextApiRequest } from "next";

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


export default function MyNewRestaurant() {

    return (
        <>
            <NavigationMenu />
            <main>
                <div>
                    New Restaurant Page
                </div>
            </main>
        </>
    )
}