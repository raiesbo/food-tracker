import { User } from '@prisma/client';
import { IDBClient } from "@/repositories/prismaClient";
import { categoryRelations } from "@/types/Category";

export default function categoriesService(instance: IDBClient['instance']) {
	return {
		getCategoriesByUserId: async (userId: User['id']) => {
			try {
				const categories = await instance.category.findMany({
					where: { userId },
					include: categoryRelations
				});

				if (categories) return {
					result: categories.map(cat => ({ ...cat, createdAt: cat.createdAt.toISOString() }))
				};

				return {
					result: {},
					error: {
						status: 400,
						message: `Unable to get all categories from user with ID ${userId}`
					}
				};
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
