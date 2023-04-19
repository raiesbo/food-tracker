import { Category } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const categoryRelations = Prisma.validator<Prisma.CategoryInclude>()({
    _count: {
        select: { restaurants: true }
    }
});

export default function prismaCategoryClient({ instance }: IDBClient) {
    return {
        createCategory: (properties: Prisma.CategoryUncheckedCreateInput) => {
            return instance.category.create({ data: properties, include: categoryRelations });
        },
        getCategory: (id: Category['id']) => {
            return instance.category.findUnique({ where: { id }, include: categoryRelations });
        },
        getCategories: (properties?: Prisma.CategoryWhereInput) => {
            return instance.category.findMany({ where: properties, include: categoryRelations });
        },
        updateCategory: (id: Category['id'], properties: Prisma.CategoryUncheckedUpdateInput) => {
            return instance.category.update({ where: { id }, data: properties, include: categoryRelations });
        },
        deleteCategory: (id: Category['id']) => {
            return instance.category.delete({ where: { id } });
        }
    };
}
