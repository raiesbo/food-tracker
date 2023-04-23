import { IDBClient } from '../repositories/prismaClient';

export default function homepageService({ instance }: IDBClient) {
    return {
        getLocationsAndCategories: async () => {
            try {
                console.time('getLocationAndCategoriesService');
                const [categories, locations] = await instance.$transaction([
                    instance.category.findMany({ select: { id: true, name: true } }),
                    instance.location.findMany({ select: { id: true, city: true } })
                ]);

                console.timeEnd('getLocationAndCategoriesService');
                if (locations && categories) return {
                    result: {
                        categories,
                        locations: Array.from(new Set(locations?.map(({ city }) => city)))
                    }
                };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all locations`
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
