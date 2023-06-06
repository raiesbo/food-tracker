import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from "@/services/user.service";
import PrismaDBClient from "@/repositories/prismaClient";

const userServiceInstance = userService(PrismaDBClient);
async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        const {
            result: user,
            error
        } = await userServiceInstance.updateUser(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(201).json({ user });
    }

    if (req.method === 'DELETE') {
        const {
            error
        } = await userServiceInstance.deleteUser(req);

        if (error) {
            return res.status(error.status).json({ errorMessage: error.message });
        }

        return res.status(204).end();
    }

    return res.status(405).end();
}

export default withApiAuthRequired(handler);
