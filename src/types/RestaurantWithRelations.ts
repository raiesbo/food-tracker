import { Prisma } from "@prisma/client";

export const restaurantRelations = Prisma.validator<Prisma.RestaurantInclude>()({
    locations: true,
    menu: true,
    schedules: true,
    categories: {
        select: {
            id: true,
            name: true
        }
    },
    user: true,
    events: {
        select: {
            id: true,
            date: true,
            opening_hour: true,
            closing_hour: true,
            location: true
        }
    },
    reviews: {
        include: {
            user: true,
            likes: {
                select: {
                    userId: true
                }
            }
        }
    }
});

const RestaurantWithRelationships = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantRelations });

type Restaurant = Prisma.RestaurantGetPayload<typeof RestaurantWithRelationships>

export default Restaurant;
