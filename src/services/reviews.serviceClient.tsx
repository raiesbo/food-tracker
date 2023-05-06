import { User } from '@prisma/client';
import { IDBClient } from "@/repositories/prismaClient";
import { restaurantWithReviewsInclude } from "@/types/RestaurantWithReviews";
import { NextApiRequest } from "next";

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
		},
		getReviewsByUserId: async (userId: User['id']) => {
			try {
				const reviews = await instance.review.findMany({
					where: { userId },
					include: {
						restaurant: {
							select: {
								name: true,
								id: true
							}
						},
						likes: {
							select: {
								userId: true
							}
						}
					}
				});

				return {
					result: reviews.map(rev => ({
						...rev,
						createdAt: rev.createdAt.toISOString(),
						updatedAt: rev.updatedAt.toISOString()
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
		},
		likeReview: async (req: NextApiRequest) => {
			const { userId, reviewId } = req.query as { userId: string, reviewId: string };
			console.log({ userId, reviewId });
			try {
				const like = await instance.like.create({
					data: {
						userId: Number(userId),
						reviewId: Number(reviewId)
					}
				});
				return { result: like };
			} catch (e) {
				const { message } = e as { message: string };
				console.error(message);
				return {
					result: {},
					error: {
						status: 400,
						message: message
					}
				};
			}
		},
		dislikeReview: async (req: NextApiRequest) => {
			const { userId, reviewId } = req.query as { userId: string, reviewId: string };
			try {
				await instance.like.deleteMany({
					where: {
						userId: Number(userId),
						reviewId: Number(reviewId)
					}
				});
				return { result: {} };
			} catch (e) {
				const { message } = e as { message: string };
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
