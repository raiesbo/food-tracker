import { Prisma } from "@prisma/client";

export const restaurantRelations = Prisma.validator<Prisma.RestaurantInclude>()({
    locations: true,
    menu: true,
    schedules: true,
    categories: true,
    user: true,
    reviews: {
        include: {
            user: true
        }
    }
});

const RestaurantWithRelationships = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantRelations });

type Restaurant = Prisma.RestaurantGetPayload<typeof RestaurantWithRelationships>

export default Restaurant;
