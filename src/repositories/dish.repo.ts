import { Dish } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const dishRelations = Prisma.validator<Prisma.DishInclude>()({
    ingredients: true
});

export default function prismaDishClient({ instance }: IDBClient) {
    return {
        createDish: (properties: Prisma.DishUncheckedCreateInput) => {
            return instance.dish.create({ data: properties });
        },
        getDish: (id: Dish['id']) => {
            return instance.dish.findUnique({ where: { id } });
        },
        getDishes: (properties?: Partial<Dish>) => {
            return instance.dish.findMany({ where: { ...properties } });
        },
        updateDish: (id: Dish['id'], properties: Prisma.DishUpdateInput) => {
            return instance.dish.update({ where: { id }, data: properties });
        },
        deleteDish: (id: Dish['id']) => {
            return instance.dish.delete({ where: { id } });
        }
    };
}
