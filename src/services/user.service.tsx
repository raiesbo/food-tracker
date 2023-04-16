import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

const validateUserUpdate = (parsedBody: Partial<User>) => {
    // TODO Implement proper data validation
    return parsedBody;
}

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
        },
        getUser: async (id: User['id']) => {
            try {
                const user = await userClient.getUser(id);

                if (!user?.id) return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to create new user'
                    }
                }

                return { result: user }

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
        },
        updateUser: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string }

            try {
                const parsedBody = JSON.parse(req.body);

                const userProps = validateUserUpdate(parsedBody);

                const user = await userClient.updateUser(Number(userId), userProps);

                if (!user?.id) return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to update user with id ${userId}'
                    }
                }

                return { result: user }

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