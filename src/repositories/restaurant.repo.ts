import { Restaurant } from "@/types";
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const restaurantRelations = Prisma.validator<Prisma.RestaurantInclude>()({
    locations: true,
    menu: true,
    schedules: true,
    category: true,
    user: true,
    reviews: {
        include: {
            user: true
        }
    }
});

export default function prismaRestaurantClient({ instance }: IDBClient) {
    return {
        createRestaurant: (properties: Prisma.RestaurantUncheckedCreateInput) => {
            return instance.restaurant.create({ data: properties });
        },
        getRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.findUnique({
                where: { id },
                include: restaurantRelations
            });
        },
        getRestaurants: (properties?: Prisma.RestaurantWhereInput) => {
            return instance.restaurant.findMany({
                where: { ...properties },
                include: restaurantRelations
            });
        },
        updateRestaurant: (id: Restaurant['id'], properties: Prisma.RestaurantUncheckedUpdateInput) => {
            return instance.restaurant.update({ where: { id }, data: properties });
        },
        deleteRestaurant: (id: Restaurant['id']) => {
            return instance.restaurant.delete({ where: { id } });
        }
    };
}
