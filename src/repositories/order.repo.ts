import { Order } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const OrderRelations = Prisma.validator<Prisma.OrderInclude>()({
    items: true
});

export default function prismaOrderClient({ instance }: IDBClient) {
    return {
        createOrder: (properties: Prisma.OrderUncheckedCreateInput) => {
            return instance.order.create({ data: properties, include: OrderRelations });
        },
        getOrder: (id: Order['id']) => {
            return instance.order.findUnique({ where: { id }, include: OrderRelations });
        },
        getOrders: (properties?: Prisma.OrderWhereInput) => {
            return instance.order.findMany({ where: properties, include: OrderRelations });
        },
        updateOrder: (id: Order['id'], properties: Prisma.OrderUncheckedUpdateInput) => {
            return instance.order.update({ where: { id }, data: properties, include: OrderRelations });
        },
        deleteOrder: (id: Order['id']) => {
            return instance.order.delete({ where: { id } });
        }
    };
}
