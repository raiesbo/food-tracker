import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { restaurantService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'GET') {
		const {
			result: restaurant,
			error
		} = await restaurantService.getRestaurant(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(200).json(restaurant);
	}

	if (req.method === 'PUT') {
		const {
			result: restaurant,
			error
		} = await restaurantService.updateRestaurant(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(201).json({ restaurant });
	}

	if (req.method === 'DELETE') {
		const { error } = await restaurantService.deleteRestaurant(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(204).end();
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
