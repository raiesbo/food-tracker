import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { restaurantService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

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

export default withApiAuthRequired(handler);
