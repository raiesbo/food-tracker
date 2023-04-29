import { Prisma } from "@prisma/client";

export const orderWithItemsInclude = Prisma.validator<Prisma.OrderInclude>()({
    restaurant: {
        select: {
            id: true,
            name: true
        }
    },
    items: {
        include: {
            dish: {
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            }
        }
    }
});

const order = Prisma.validator<Prisma.OrderArgs>()({ include: orderWithItemsInclude });

type OrderWithItems = Prisma.OrderGetPayload<typeof order>

export default OrderWithItems;
