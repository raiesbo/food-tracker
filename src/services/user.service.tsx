import { NextApiRequest } from 'next';
import prismaClients from '../repositories';
import { RequestResult } from "@/types";
import User from "@/types/User";

export default function userService({ userClient }: typeof prismaClients) {
	return {
		createNewUser: async (req: NextApiRequest): Promise<RequestResult<User>> => {
			const parsedBody = JSON.parse(req.body);

			try {
				const { firstName, lastName, email, isSP } = parsedBody;

				const user = await userClient.createUser({
					firstName,
					lastName,
					email,
					role: isSP ? 'SP' : 'CUSTOMER',
					location: {
						create: {
							streetName: '',
							streetNumber: '',
							zip: '',
							city: '',
							county: ''
						}
					}
				} as any);

				if (user) return { result: user as User };

				return {
					result: {} as User,
					error: {
						status: 400,
						message: 'Unable to create new user'
					}
				};
			} catch (e) {
				const { message } = e as { message: string };
				console.error(e);
				return {
					result: {} as User,
					error: {
						status: 400,
						message
					}
				};
			}
		}
	};
}
