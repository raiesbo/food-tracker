import dbServices from '@/services';
import type { NextApiRequest, NextApiResponse } from 'next';

const { userService } = dbServices;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const user = await userService.createNewUser(req);

        if (user.error) {
            return res.status(user.error.statuas).end(user.error.message);
        }

        return res.status(201).json(user.result);
    }

    res.status(405).end();
}
