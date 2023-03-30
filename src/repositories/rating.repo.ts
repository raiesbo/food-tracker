import { Rating } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaRatingClient({ instance }: IDBClient) {
    return {
        createRating: (properties: Partial<Rating>) => {
            return instance.rating.create({ data: properties });
        },
        getRating: (id: Rating['id']) => {
            return instance.rating.findUnique({ where: { id } });
        },
        getRatings: (properties?: Partial<Rating>) => {
            return instance.rating.findMany({ where: { ...properties } });
        },
        updateRating: (id: Rating['id'], properties: Partial<Rating>) => {
            return instance.rating.update({ where: { id }, data: properties });
        },
        deleteRating: (id: Rating['id']) => {
            return instance.rating.delete({ where: { id } });
        }
    };
}
