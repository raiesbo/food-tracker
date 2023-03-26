import { Dish } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaDishClient from './dish.repo';
import prismaClientMock from './mocks/prismaClientMock';

const dischesClient = prismaDishClient(prismaClientMock);

describe('prisma disches client', () => {
    it('can create a restaurant', () => {
        const createDishMock = vi.fn();
        prismaClientMock.instance.dish.create = createDishMock;

        dischesClient.createDish({ name: 'test_name' } as Dish);

        expect(createDishMock).toHaveBeenCalledWith({ 'data': { 'name': 'test_name' } });
    });

    it('can get a restaurant by id', () => {
        const getDishMock = vi.fn();
        prismaClientMock.instance.dish.findUnique = getDishMock;

        dischesClient.getDish('6' as Dish['id']);

        expect(getDishMock).toHaveBeenCalledWith({ 'where': { 'id': '6' } });
    });

    it('can get many disches by ids', () => {
        const getDischesMock = vi.fn();
        prismaClientMock.instance.dish.findMany = getDischesMock;

        dischesClient.getDishes({ name: 'test_name' } as Dish);

        expect(getDischesMock).toHaveBeenCalledWith({ 'where': { 'name': 'test_name' } });
    });

    it('can update a dish', () => {
        const updateDishMock = vi.fn();
        prismaClientMock.instance.dish.update = updateDishMock;

        dischesClient.updateDish('4' as Dish['id'], { name: 'test_name' } as Dish);

        expect(updateDishMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'name': 'test_name' }
        });
    });

    it('can delete a Dish', () => {
        const deleteDishMock = vi.fn();
        prismaClientMock.instance.dish.delete = deleteDishMock;

        dischesClient.deleteDish('5' as Dish['id']);

        expect(deleteDishMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
