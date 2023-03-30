import services from '@/services';
import type { NextApiRequest, NextApiResponse } from 'next';

const { userService, auth0Service } = services;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const {
            result: createNewUserResult,
            error: createNewUserError
        } = await userService.createNewUser(req);

        if (createNewUserError) {
            return res.status(createNewUserError.status).end(createNewUserError.message);
        }

        const {
            error: createAuth0UserError
        } = await auth0Service.createAuth0User(req, createNewUserResult.id);

        if (createAuth0UserError) {
            return res.status(createAuth0UserError.status).end(createAuth0UserError.message);
        }

        return res.status(201).json(createNewUserResult);
    }

    res.status(405).end();
}
