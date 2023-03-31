import { Category } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaCategoryClient({ instance }: IDBClient) {
    return {
        createCategory: (properties: Category) => {
            return instance.category.create({ data: properties });
        },
        getCategory: (id: Category['id']) => {
            return instance.category.findUnique({ where: { id } });
        },
        getCategories: (properties?: Partial<Category>) => {
            return instance.category.findMany({ where: { ...properties } });
        },
        updateCategory: (id: Category['id'], properties: Partial<Category>) => {
            return instance.category.update({ where: { id }, data: properties });
        },
        deleteCategory: (id: Category['id']) => {
            return instance.category.delete({ where: { id } });
        }
    };
}
