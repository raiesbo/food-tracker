import { Restaurant } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaRestaurantClient({ instance }: IDBClient) {
    return {
        createRestaurant: (properties: Restaurant) => {
            return instance.restaurant.create({ data: properties });
        },
        getRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.findUnique({ where: { id } });
        },
        getRestaurants: (properties?: Partial<Restaurant>) => {
            return instance.restaurant.findMany({ where: { ...properties } });
        },
        updateRestaurant: (id: Restaurant['id'], properties: Partial<Restaurant>) => {
            return instance.restaurant.update({ where: { id }, data: properties });
        },
        deleteRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.delete({ where: { id } });
        }
    };
}
