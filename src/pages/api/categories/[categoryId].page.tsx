import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { categoriesService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'DELETE') {
        const {
            result: category,
            error
        } = await categoriesService.deleteCategory(req);

        if (error) return res.status(error.status).json({ message: error.message });

        return res.status(201).json({ category });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
