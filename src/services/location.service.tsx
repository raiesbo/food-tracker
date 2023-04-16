import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function locationsService({ locationClient }: typeof prismaClients) {
    return {
        getAllUniqueCities: async () => {
            try {
                const locations = await locationClient.getLocations()

                if (locations) return { result: Array.from(new Set(locations?.map(({ city }) => city))) }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all locations`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        },
        updateLocation: async (req: NextApiRequest) => {
            const { locationId } = req.query as { locationId: string };

            try {
                const parsedBody = JSON.parse(req.body);

                const location = await locationClient.updateLocation(Number(locationId), parsedBody)

                if (location) return { result: location }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update location with ID: ${locationId}`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        }
    }
}