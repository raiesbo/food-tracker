import { Event } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaEventClient from './event.repo';
import prismaClientMock from './mocks/prismaClientMock';

const eventsClient = prismaEventClient(prismaClientMock);

describe('prisma Events client', () => {
    it('can create a Event', () => {
        const createEventMock = vi.fn();
        prismaClientMock.instance.event.create = createEventMock;

        eventsClient.createEvent({ name: 'test_name' } as Event);

        expect(createEventMock).toHaveBeenCalledWith({
            'data': { 'name': 'test_name' },
            include: { location: true }
        });
    });

    it('can get a Event by id', () => {
        const getEventMock = vi.fn();
        prismaClientMock.instance.event.findUnique = getEventMock;

        eventsClient.getEvent(6 as Event['id']);

        expect(getEventMock).toHaveBeenCalledWith({
            'where': { 'id': 6 },
            include: { location: true }
        });
    });

    it('can get many Events by ids', () => {
        const getEventsMock = vi.fn();
        prismaClientMock.instance.event.findMany = getEventsMock;

        eventsClient.getEvents({ name: 'test_name' } as Event);

        expect(getEventsMock).toHaveBeenCalledWith({
            'where': { 'name': 'test_name' },
            include: { location: true }
        });
    });

    it('can update a Event', () => {
        const updateEventMock = vi.fn();
        prismaClientMock.instance.event.update = updateEventMock;

        eventsClient.updateEvent(4 as Event['id'], { name: 'test_name' } as Event);

        expect(updateEventMock).toHaveBeenCalledWith({
            'where': { 'id': 4 },
            'data': { 'name': 'test_name' },
            include: { location: true }
        });
    });

    it('can delete a Event', () => {
        const deleteEventMock = vi.fn();
        prismaClientMock.instance.event.delete = deleteEventMock;

        eventsClient.deleteEvent(5 as Event['id']);

        expect(deleteEventMock).toHaveBeenCalledWith({ 'where': { 'id': 5 } });
    });
});
