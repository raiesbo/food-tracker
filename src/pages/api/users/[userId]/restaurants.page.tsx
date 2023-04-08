import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { restaurantService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {
            result: restaurant,
            error
        } = await restaurantService.createNewRestaurant(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ restaurant });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
