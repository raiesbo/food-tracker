import { Prisma } from "@prisma/client";

export const restaurantWithOrdersInclude = Prisma.validator<Prisma.RestaurantInclude>()({
    orders: {
        select: {
            id: true,
            isAccepted: true,
            createdAt: true,
            deliveryAt: true,
            items: {
                select: {
                    dish: { select: { id: true, name: true, price: true } },
                    units: true
                }
            }
        }
    }
});

const restaurant = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantWithOrdersInclude });

type RestaurantWithOrders = Prisma.RestaurantGetPayload<typeof restaurant>

export default RestaurantWithOrders;
