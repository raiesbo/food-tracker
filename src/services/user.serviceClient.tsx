import User, { userRelations } from "@/types/User";
import { IDBClient } from "@/repositories/prismaClient";
import { NextApiRequest } from "next";

export default function userService({ instance }: IDBClient) {
	return {
		getUser: async (userId: User['id']) => {
			try {
				const user = await instance.user.findUnique({
					where: { id: userId },
					include: userRelations
				});
				return { result: user };
			} catch (e) {
				const message = e as { message: string };
				console.error(message);
				return {
					result: {},
					error: {
						status: 400,
						message: message
					}
				};
			}
		},
		updateUser: async (req: NextApiRequest) => {
			const { userId } = req.query as {userId: string};

			try {
				const parsedBody = JSON.parse(req.body);

				console.log(parsedBody.user);
				console.log(parsedBody.location);

				if (parsedBody.location?.id) {
					await instance.location.update({
						where: { id: Number(parsedBody.location.id) },
						data: parsedBody.location
					});
				}

				const user = await instance.user.update({
					where: { id: Number(userId) },
					data: parsedBody.user,
					include: userRelations
				});

				return { result: user };
			} catch (e) {
				const message = e as { message: string };
				console.error(message);
				return {
					result: {},
					error: {
						status: 400,
						message: message
					}
				};
			}
		},
		deleteUser: async (req: NextApiRequest) => {
			const { userId } = req.query as { userId: string };

			try {
				await instance.user.delete({ where: { id: Number(userId) } });
				return { result: {} };
			} catch (e) {
				const message = e as { message: string };
				console.error(message);
				return {
					result: {},
					error: {
						status: 400,
						message: message
					}
				};
			}
		}
	};
}
