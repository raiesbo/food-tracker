import { Event } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const EventRelations = Prisma.validator<Prisma.EventInclude>()({
    location: true
});

export default function prismaEventClient({ instance }: IDBClient) {
    return {
        createEvent: (properties: Prisma.EventUncheckedCreateInput) => {
            return instance.event.create({ data: properties, include: EventRelations });
        },
        getEvent: (id: Event['id']) => {
            return instance.event.findUnique({ where: { id }, include: EventRelations });
        },
        getEvents: (properties?: Prisma.EventWhereInput) => {
            return instance.event.findMany({ where: properties, include: EventRelations });
        },
        updateEvent: (id: Event['id'], properties: Prisma.EventUncheckedUpdateInput) => {
            return instance.event.update({ where: { id }, data: properties, include: EventRelations });
        },
        deleteEvent: (id: Event['id']) => {
            return instance.event.delete({ where: { id } });
        }
    };
}
