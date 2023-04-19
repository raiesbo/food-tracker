import { Order } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaClientMock from './mocks/prismaClientMock';
import prismaOrderClient from './order.repo';

const ordersClient = prismaOrderClient(prismaClientMock);

describe('prisma Orders client', () => {
    it('can create a Order', () => {
        const createOrderMock = vi.fn();
        prismaClientMock.instance.order.create = createOrderMock;

        ordersClient.createOrder({ userId: 4832 } as Order);

        expect(createOrderMock).toHaveBeenCalledWith({
            data: { userId: 4832 },
            include: { items: true }
        });
    });

    it('can get a Order by id', () => {
        const getOrderMock = vi.fn();
        prismaClientMock.instance.order.findUnique = getOrderMock;

        ordersClient.getOrder(6 as Order['id']);

        expect(getOrderMock).toHaveBeenCalledWith({
            'where': { 'id': 6 },
            include: { "items": true }
        });
    });

    it('can get many Orders by ids', () => {
        const getOrdersMock = vi.fn();
        prismaClientMock.instance.order.findMany = getOrdersMock;

        ordersClient.getOrders({ userId: 4832 } as Order);

        expect(getOrdersMock).toHaveBeenCalledWith({
            'where': { 'userId': 4832 },
            include: { "items": true }
        });
    });

    it('can update a Order', () => {
        const updateOrderMock = vi.fn();
        prismaClientMock.instance.order.update = updateOrderMock;

        ordersClient.updateOrder(4 as Order['id'], { userId: 4832 } as Order);

        expect(updateOrderMock).toHaveBeenCalledWith({
            'where': { 'id': 4 },
            'data': { 'userId': 4832 },
            include: { "items": true }
        });
    });

    it('can delete a Order', () => {
        const deleteOrderMock = vi.fn();
        prismaClientMock.instance.order.delete = deleteOrderMock;

        ordersClient.deleteOrder(5 as Order['id']);

        expect(deleteOrderMock).toHaveBeenCalledWith({ 'where': { 'id': 5 } });
    });
});
