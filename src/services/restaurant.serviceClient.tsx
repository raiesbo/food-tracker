import { Prisma } from '@prisma/client';
import { IDBClient } from "@/repositories/prismaClient";
import { NextApiRequest } from "next";
import { restaurantRelations } from "@/repositories/restaurant.repo";

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

			if (!!query?.creditcard) {
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
				locations: { some: { city: query.city as string } }
			};

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
		}
	};
}
