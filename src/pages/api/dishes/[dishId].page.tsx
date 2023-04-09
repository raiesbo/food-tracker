import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { dishesService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    // if (req.method === 'PUT') {
    //     const {
    //         result: restaurant,
    //         error
    //     } = await restaurantService.updateRestaurant(req);

    //     if (error) {
    //         return res.status(error.status).json({ errorMessage: error.message });
    //     }

    //     return res.status(201).json({ restaurant });
    // }

    if (req.method === 'DELETE') {
        const { error } = await dishesService.deleteDish(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(204).end();
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
