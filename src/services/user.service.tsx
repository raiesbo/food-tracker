import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function userService({ userClient }: typeof prismaClients) {
    return {
        createNewUser: async (req: NextApiRequest) => {
            const parsedBody = JSON.parse(req.body);

            try {
                const user = await userClient.createUser(parsedBody)

                if (user) return { result: user }

                return {
                    result: {},
                    error: {
                        statuas: 400,
                        message: 'Unable to create new user'
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        statuas: 400,
                        message: message
                    }
                }
            }
        }
    }
}