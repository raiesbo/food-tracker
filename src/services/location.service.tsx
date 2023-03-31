import prismaClients from '../repositories';

export default function locationsService({ locationClient }: typeof prismaClients) {
    return {
        getAllLocations: async () => {
            try {
                const locations = await locationClient.getLocations()

                if (locations) return { result: locations }

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

        }
    }
}