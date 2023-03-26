import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function userService({ userClient }: typeof prismaClients) {
    return {
        createNewUser: async (req: NextApiRequest) => {
            const parsedBody = JSON.parse(req.body);

            try {
                const { firstName, lastName, email, isSP } = parsedBody;

                const user = await userClient.createUser({
                    firstName,
                    lastName,
                    email,
                    role: isSP ? 'SP' : 'CUSTOMER'
                } as User)

                if (user) return { result: user }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to create new user'
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        }
    }
}