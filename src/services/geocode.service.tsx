import GeocodeItem from "@/types/GeocodeItem";

export default function geocodeService() {
	const baseURL = 'https://geocode.maps.co/search?q=';

	return {
		getAddresses: async (location: { [key: string]: string }) => {
			const searchParas = Object.values(location).filter(data => data).join('+');
			const results = await fetch(`${baseURL}${searchParas}`);

			const parsedBody = await results?.json() as Array<GeocodeItem>;

			if (parsedBody?.length > 0) {
				return {
					result: parsedBody.map(result => ({
						id: result.place_id,
						formattedAddress: result.display_name,
						lat: result.lat,
						lon: result.lon
					}))
				};
			}

			return { result: null };
		}
	};
}
