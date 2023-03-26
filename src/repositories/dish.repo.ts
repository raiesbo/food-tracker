import { Dish } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaDishClient({ instance }: IDBClient) {
    return {
        createDish: (properties: Dish) => {
            return instance.dish.create({ data: properties });
        },
        getDish: (id: Dish['id']) => {
            return instance.dish.findUnique({ where: { id } });
        },
        getDishs: (properties?: Partial<Dish>) => {
            return instance.dish.findMany({ where: { ...properties } });
        },
        updateDish: (id: Dish['id'], properties: Partial<Dish>) => {
            return instance.dish.update({ where: { id }, data: properties });
        },
        deleteDish: (id: Dish['id']) => {
            return instance.dish.delete({ where: { id } });
        }
    };
}
