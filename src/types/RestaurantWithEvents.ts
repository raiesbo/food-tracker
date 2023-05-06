import { Prisma } from "@prisma/client";

export const restaurantWithEventInclude = Prisma.validator<Prisma.RestaurantInclude>()({
    user: true,
    events: {
        include: {
            location: true
        }
    }
});

const Restaurant = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantWithEventInclude });

type RestaurantWithEvents = Prisma.RestaurantGetPayload<typeof Restaurant>

export default RestaurantWithEvents;
