import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function categoriesService({ categoryClient }: typeof prismaClients) {
    return {
        getAllCategories: async () => {
            try {
                const categories = await categoryClient.getCategories();

                if (categories) return { result: categories };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all categories`
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
        },
        getCategoriesByUserId: async (userId: User['id']) => {
            try {
                const categories = await categoryClient.getCategories({ userId });

                if (categories) return { result: categories };

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
        },
        deleteCategory: async (req: NextApiRequest) => {
            const { categoryId } = req.query as { categoryId: string };

            try {
                await categoryClient.deleteCategory(Number(categoryId));

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
        },
        createNewCategory: async (req: NextApiRequest) => {
            try {
                const parsedBody = JSON.parse(req.body);

                const category = await categoryClient.createCategory(parsedBody);

                if (category) return { result: category };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to create a new category`
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