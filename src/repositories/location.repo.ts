import { Location } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaLocationClient({ instance }: IDBClient) {
    return {
        createLocation: (properties: Location) => {
            return instance.location.create({ data: properties });
        },
        getLocation: (id: Location['id']) => {
            return instance.location.findUnique({ where: { id } });
        },
        getLocations: (properties?: Partial<Location>) => {
            return instance.location.findMany({ where: { ...properties } });
        },
        updateLocation: (id: Location['id'], properties: Partial<Location>) => {
            return instance.location.update({ where: { id }, data: properties });
        },
        deleteLocation: (id: Location['id']) => {
            return instance.location.delete({ where: { id } });
        }
    };
}
