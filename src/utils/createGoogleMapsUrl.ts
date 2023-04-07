export default function createGoogleMapsUrl({ streetName = '', streetNumber, city, zipcode }: {
    streetName: string,
    streetNumber?: string | null,
    city?: string | null,
    zipcode?: string | null
}) {
    const baseUrl = new URL('https://www.google.com/maps/search/');
    baseUrl.searchParams.append('api', '1');

    let query = streetName;
    if (streetNumber) query += `+${streetNumber}`
    if (streetNumber) query += `+${city}`
    if (streetNumber) query += `+${zipcode}`

    baseUrl.searchParams.append('query', query);

    return baseUrl.href;
}