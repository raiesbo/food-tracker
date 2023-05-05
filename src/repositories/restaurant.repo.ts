import { Restaurant } from "@/types";
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';
import { restaurantRelations } from "@/types/RestaurantWithRelations";

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
