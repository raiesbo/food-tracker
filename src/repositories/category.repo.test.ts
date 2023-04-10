import { Category } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaCategoryClient from './category.repo';
import prismaClientMock from './mocks/prismaClientMock';

const categoriesClient = prismaCategoryClient(prismaClientMock);

describe('prisma Categorys client', () => {
    it('can create a Category', () => {
        const createCategoryMock = vi.fn();
        prismaClientMock.instance.category.create = createCategoryMock;

        categoriesClient.createCategory({ name: 'category test' } as Category);

        expect(createCategoryMock).toHaveBeenCalledWith({
            data: { 'name': 'category test' },
            include: {
                _count: {
                    select: { restaurants: true },
                },
            }
        });
    });

    it('can get a Category by id', () => {
        const getCategoryMock = vi.fn();
        prismaClientMock.instance.category.findUnique = getCategoryMock;

        categoriesClient.getCategory('6' as Category['id']);

        expect(getCategoryMock).toHaveBeenCalledWith({
            'where': { 'id': '6' }, include: {
                _count: {
                    select: { restaurants: true },
                },
            }
        });
    });

    it('can get many Categorys by ids', () => {
        const getCategorysMock = vi.fn();
        prismaClientMock.instance.category.findMany = getCategorysMock;

        categoriesClient.getCategories({ name: 'category test' } as Category);

        expect(getCategorysMock).toHaveBeenCalledWith({
            'where': { 'name': 'category test', },
            include: {
                _count: {
                    select: { restaurants: true },
                },
            }
        });
    });

    it('can update a Category', () => {
        const updateCategoryMock = vi.fn();
        prismaClientMock.instance.category.update = updateCategoryMock;

        categoriesClient.updateCategory('4' as Category['id'], { name: 'category test' } as Category);

        expect(updateCategoryMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'name': 'category test' },
            include: {
                _count: {
                    select: { restaurants: true },
                },
            }
        });
    });

    it('can delete a Category', () => {
        const deleteCategoryMock = vi.fn();
        prismaClientMock.instance.category.delete = deleteCategoryMock;

        categoriesClient.deleteCategory('5' as Category['id']);

        expect(deleteCategoryMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
