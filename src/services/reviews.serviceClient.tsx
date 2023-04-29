import { User } from '@prisma/client';
import { IDBClient } from "@/repositories/prismaClient";
import { restaurantWithReviewsInclude } from "@/types/RestaurantWithReviews";

export default function reviewsService(instance: IDBClient['instance']) {
	return {
		getRestaurantsWithReviews: async (userId: User['id']) => {
			try {
				const restaurants = await instance.restaurant.findMany({
					where: { userId },
					include: restaurantWithReviewsInclude
				});

				return {
					result: restaurants.map(res => ({
						...res,
						createdAt: res.createdAt.toISOString(),
						updatedAt: res.updatedAt.toISOString(),
						reviews: [
							...res.reviews.map(rev => ({
								...rev,
								createdAt: rev.createdAt.toISOString(),
								updatedAt: rev.updatedAt.toISOString()
							}))
						]
					}))
				};

			} catch (e) {
				const message = e as { message: string };
				console.error(message);
				return {
					result: {},
					error: {
						status: 400,
						message: message
					}
				};
			}
		}
	};
}
