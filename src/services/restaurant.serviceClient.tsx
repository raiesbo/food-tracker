import { Prisma, User } from '@prisma/client';
import { IDBClient } from "@/repositories/prismaClient";
import { NextApiRequest } from "next";
import { Restaurant } from "@/types";
import { restaurantRelations } from "@/types/RestaurantWithRelations";
import { restaurantWithEventInclude } from "@/types/RestaurantWithEvents";

export default function restaurantsService(instance: IDBClient['instance']) {
	return {
		getAllRestaurantByFilter: async (req: NextApiRequest) => {
			const query = req.query;
			let filters: Prisma.RestaurantWhereInput = { isVisible: true };

			if (!!query?.vegan) {
				filters = {
					...filters,
					menu: {
						some: {
							isVegan: true
						}
					}
				};
			}

			if (!!query?.creditCard) {
				filters = {
					...filters,
					isCashOnly: false
				};
			}

			if (query?.name) filters = {
				...filters,
				name: {
					contains: query.name as string,
					mode: 'insensitive'
				}
			};

			if (query?.category) filters = {
				...filters,
				categories: { some: { name: query.category as string } }
			};

			if (query?.city) filters = {
				...filters,
				location: { city: query.city as string }
			};

			console.log(filters);

			try {
				const restaurants = await instance.restaurant.findMany({
					where: filters,
					include: restaurantRelations
				});

				if (restaurants) return { result: restaurants };

				return {
					result: {},
					error: {
						status: 400,
						message: `Unable to get all restaurants with the following filters ${filters}`
					}
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
		getRestaurant: async (req: NextApiRequest | { query: { restaurantId: Restaurant['id'] } }) => {
			const { restaurantId } = req.query as { restaurantId: string };

			try {
				const restaurant = await instance.restaurant.findUnique({
					where: { id: Number(restaurantId) },
					include: restaurantRelations
				});

				if (restaurant) return {
					result: {
						...restaurant,
						createdAt: `${restaurant.createdAt}`,
						updatedAt: `${restaurant.updatedAt}`,
						reviews: [
							...restaurant.reviews.map(review => ({
								...review,
								createdAt: `${review?.createdAt}`,
								updatedAt: `${review?.updatedAt}`
							}))
						],
						menu: [
							...restaurant.menu.map(dish => ({
								...dish,
								createdAt: `${dish?.createdAt}`,
								updatedAt: `${dish?.updatedAt}`
							}))
						],
						events: [
							...restaurant.events.map(event => ({
								...event, date: `${event?.date}`
							}))
						]
					}
				};

				return {
					result: {},
					error: {
						status: 400,
						message: `Unable to find restaurant with ID ${restaurantId}`
					}
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
		getRestaurantsWithEventByUserId: async (userId: User['id']) => {
			try {
				const restaurants = await instance.restaurant.findMany({
					where: { userId: Number(userId) },
					include: restaurantWithEventInclude
				});
				return {
					result: [
						...restaurants.map(restaurant => ({
							...restaurant,
							createdAt: `${restaurant?.createdAt}`,
							updatedAt: `${restaurant?.updatedAt}`,
							events: [
								...restaurant.events.map(event => ({
									...event,
									createdAt: `${event?.createdAt}`,
									updatedAt: `${event?.updatedAt}`,
									date: `${event?.date}`
								}))
							]
						}))
					]
				};
			} catch (e) {
				const message = e as { message: string };
				console.error(message);
				return {
					result: [],
					error: {
						status: 400,
						message: message
					}
				};
			}
		}
	};
}
