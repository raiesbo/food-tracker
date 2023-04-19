import { Location } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaLocationClient from './location.repo';
import prismaClientMock from './mocks/prismaClientMock';

const locationsClient = prismaLocationClient(prismaClientMock);

describe('prisma locations client', () => {
    it('can create a restaurant', () => {
        const createLocationMock = vi.fn();
        prismaClientMock.instance.location.create = createLocationMock;

        locationsClient.createLocation({ streetName: 'test_streetName' } as Location);

        expect(createLocationMock).toHaveBeenCalledWith({ 'data': { 'streetName': 'test_streetName' } });
    });

    it('can get a restaurant by id', () => {
        const getLocationMock = vi.fn();
        prismaClientMock.instance.location.findUnique = getLocationMock;

        locationsClient.getLocation(6 as Location['id']);

        expect(getLocationMock).toHaveBeenCalledWith({ 'where': { 'id': 6 } });
    });

    it('can get many locations by ids', () => {
        const getlocationsMock = vi.fn();
        prismaClientMock.instance.location.findMany = getlocationsMock;

        locationsClient.getLocations({ streetName: 'test_streetName' } as Location);

        expect(getlocationsMock).toHaveBeenCalledWith({ 'where': { 'streetName': 'test_streetName' } });
    });

    it('can update a Location', () => {
        const updateLocationMock = vi.fn();
        prismaClientMock.instance.location.update = updateLocationMock;

        locationsClient.updateLocation(4 as Location['id'], { streetName: 'test_streetName' } as Location);

        expect(updateLocationMock).toHaveBeenCalledWith({
            'where': { 'id': 4 },
            'data': { 'streetName': 'test_streetName' }
        });
    });

    it('can delete a Location', () => {
        const deleteLocationMock = vi.fn();
        prismaClientMock.instance.location.delete = deleteLocationMock;

        locationsClient.deleteLocation(5 as Location['id']);

        expect(deleteLocationMock).toHaveBeenCalledWith({ 'where': { 'id': 5 } });
    });
});
