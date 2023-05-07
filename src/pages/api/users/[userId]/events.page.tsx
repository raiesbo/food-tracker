import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import restaurantsService from "@/services/restaurant.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";

const restaurantsServiceInstance = restaurantsService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'GET') {
		const {
			result: restaurants,
			error
		} = await restaurantsServiceInstance.getRestaurantsWithEventByUserId(Number(req.query.userId));

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(200).json({ restaurants });
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
