import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./BusinessReviews.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import PrismaDBClient from "@/repositories/prismaClient";
import reviewsService from "@/services/reviews.serviceClient";
import RestaurantWithReviews from "@/types/RestaurantWithReviews";
import { Text } from "@/components/Text";
import { BusinessReviewsList } from "@/components/BusinessReviews";

const reviewsServiceInstance = reviewsService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);
	const userId = session && session?.user[auth0Config.metadata]?.user_id;

	if (!userId) {
		return { props: { restaurants: [] } };
	}

	const { result: restaurants } = await reviewsServiceInstance.getRestaurantsWithReviews(userId);

	return { props: { restaurants, userId } };
};

type Props = {
	restaurants: Array<RestaurantWithReviews>,
	userId: number
}
export default function BusinessReviews({ restaurants, userId }: Props) {
	return (
		<LayoutWithSideBar>
			<div className={styles.root}>
				<PageHeader title={'Food Truck Reviews'}></PageHeader>
				{restaurants.map(restaurant => {
					return restaurant.reviews.length > 0 && (
						<div key={restaurant.id} className={styles.tableContainer}>
							<Text bold variant='h3'>
								{restaurant.name}
							</Text>
							<BusinessReviewsList
								prefechedReviews={restaurant.reviews}
								userId={userId}
							/>
						</div>
					);
				})}
			</div>
		</LayoutWithSideBar>
	);
}
