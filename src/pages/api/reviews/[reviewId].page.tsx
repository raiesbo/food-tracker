import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { reviewsService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        const {
            result: review,
            error
        } = await reviewsService.updateReview(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ review });
    }

    if (req.method === 'DELETE') {
        const {
            result,
            error
        } = await reviewsService.deleteReview(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(204).end();
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
