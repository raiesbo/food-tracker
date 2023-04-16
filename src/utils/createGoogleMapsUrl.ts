export default function createGoogleMapsUrl({ streetName = '', streetNumber, city, zip }: {
    streetName: string,
    streetNumber?: string | null,
    city?: string | null,
    zip?: string | null
}) {
    const baseUrl = new URL('https://www.google.com/maps/search/');
    baseUrl.searchParams.append('api', '1');

    let query = streetName;
    if (streetNumber) query += `+${streetNumber}`;
    if (city) query += `+${city}`;
    if (zip) query += `+${zip}`;

    baseUrl.searchParams.append('query', query);

    return baseUrl.href;
}
