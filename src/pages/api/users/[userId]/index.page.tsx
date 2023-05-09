import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const { userService } = services;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        const {
            result: user,
            error
        } = await userService.updateUser(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ user });
    }

    if (req.method === 'DELETE') {
        const {
            error
        } = await userService.deleteUser(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(204).end();
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
