import prismaClients from '../repositories';

export default function categoriesService({ categoryClient }: typeof prismaClients) {
    return {
        getAllCategories: async () => {
            try {
                const categories = await categoryClient.getCategories()

                if (categories) return { result: categories }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all categories`
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