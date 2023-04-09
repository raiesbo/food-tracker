import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { dishesService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {
            result: dish,
            error
        } = await dishesService.createNewDish(req);

        console.log({ dish, error })

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ dish });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
