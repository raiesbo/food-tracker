import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { reviewsService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const {
            result: reviews,
            error
        } = await reviewsService.getAllReviewsByUserId(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(200).json({ reviews });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
