import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { reviewsService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {
            result: review,
            error
        } = await reviewsService.createReview(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ review });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
