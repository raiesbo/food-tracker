import services from '@/services';
import type { NextApiRequest, NextApiResponse } from 'next';

const { restaurantService } = services;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const {
            result: restaurants,
            error
        } = await restaurantService.getAllRestaurantByFilter(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ restaurants });
    }

    res.status(405).end();
}
