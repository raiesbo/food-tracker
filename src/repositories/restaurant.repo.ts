import { Restaurant } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const restaurantRelations = Prisma.validator<Prisma.RestaurantInclude>()({
    locations: true,
    menu: {
        include: {
            ingredients: true
        }
    },
    ratings: true,
    schedules: true,
    category: true,
    comments: {
        include: {
            answers: true
        }
    }
});

export default function prismaRestaurantClient({ instance }: IDBClient) {
    return {
        createRestaurant: (properties: Restaurant) => {
            return instance.restaurant.create({ data: properties });
        },
        getRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.findUnique({
                where: { id },
                include: restaurantRelations
            });
        },
        getRestaurants: (properties?: Partial<Restaurant>) => {
            return instance.restaurant.findMany({
                where: { ...properties },
                include: restaurantRelations
            });
        },
        updateRestaurant: (id: Restaurant['id'], properties: Partial<Restaurant>) => {
            return instance.restaurant.update({ where: { id }, data: properties });
        },
        deleteRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.delete({ where: { id } });
        }
    };
}
