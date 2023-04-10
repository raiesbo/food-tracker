import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { locationsService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        const {
            result: location,
            error
        } = await locationsService.updateLocation(req);

        if (error) {
            return res.status(error.status).json({ message: error.message });
        }

        return res.status(201).json({ location });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
