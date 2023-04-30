import type { NextApiRequest, NextApiResponse } from 'next';
import PrismaDBClient from "@/repositories/prismaClient";
import restaurantsService from "@/services/restaurant.serviceClient";

const restaurantServiceInstance = restaurantsService(PrismaDBClient.instance);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'GET') {
		const {
			result: restaurants,
			error
		} = await restaurantServiceInstance.getAllRestaurantByFilter(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(201).json({ restaurants });
	}

	res.status(405).end();
}
