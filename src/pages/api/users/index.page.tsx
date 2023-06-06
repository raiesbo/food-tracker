import services from '@/services';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from "@/services/user.service";
import PrismaDBClient from "@/repositories/prismaClient";

const { auth0Service } = services;
const userServiceInstance = userService(PrismaDBClient);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {
            result: createNewUserResult,
            error: createNewUserError
        } = await userServiceInstance.createNewUser(req);

        if (createNewUserError) {
            return res.status(createNewUserError.status).json({ errorMessage: createNewUserError.message });
        }

        const {
            error: createAuth0UserError
        } = await auth0Service.createAuth0User(req, createNewUserResult.id);

        if (createAuth0UserError) {
            return res.status(createAuth0UserError.status).json({ errorMessage: createAuth0UserError.message });
        }

        return res.status(201).json(createNewUserResult);
    }

    res.status(405).end();
}
