import { Restaurant } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaClientMock from './mocks/prismaClientMock';
import prismaRestaurantClient from './restaurant.repo';

const restaurantsClient = prismaRestaurantClient(prismaClientMock);

describe('prisma Restaurants client', () => {
    it('can create a restaurant', () => {
        const createRestaurantMock = vi.fn();
        prismaClientMock.instance.restaurant.create = createRestaurantMock;

        restaurantsClient.createRestaurant({ name: 'test_name' } as Restaurant);

        expect(createRestaurantMock).toHaveBeenCalledWith({ 'data': { 'name': 'test_name' } });
    });

    it('can get a restaurant by id', () => {
        const getRestaurantMock = vi.fn();
        prismaClientMock.instance.restaurant.findUnique = getRestaurantMock;

        restaurantsClient.getRestaurant('6' as Restaurant['id']);

        expect(getRestaurantMock).toHaveBeenCalledWith({
            'where': { 'id': '6' },
            'include': {
                'locations': true,
                'menu': {
                    'include': {
                        'ingredients': true
                    }
                },
                'ratings': true,
                'schedules': true,
                'category': true,
                comments: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    });

    it('can get many restaurants by ids', () => {
        const getRestaurantsMock = vi.fn();
        prismaClientMock.instance.restaurant.findMany = getRestaurantsMock;

        restaurantsClient.getRestaurants({ name: 'test_name' } as Restaurant);

        expect(getRestaurantsMock).toHaveBeenCalledWith({
            'where': { 'name': 'test_name' },
            'include': {
                'locations': true,
                'menu': {
                    'include': {
                        'ingredients': true
                    }
                },
                'ratings': true,
                'schedules': true,
                'category': true,
                comments: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    });

    it('can update a restaurant', () => {
        const updateRestaurantMock = vi.fn();
        prismaClientMock.instance.restaurant.update = updateRestaurantMock;

        restaurantsClient.updateRestaurant('4' as Restaurant['id'], { name: 'test_name' } as Restaurant);

        expect(updateRestaurantMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'name': 'test_name' }
        });
    });

    it('can delete a restaurant', () => {
        const deleteRestaurantMock = vi.fn();
        prismaClientMock.instance.restaurant.delete = deleteRestaurantMock;

        restaurantsClient.deleteRestaurant('5' as Restaurant['id']);

        expect(deleteRestaurantMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
