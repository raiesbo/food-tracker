import { Location } from "@prisma/client";

export default function findMainLocation(locations: Array<Location> = []) {
    const mainLocation = locations.find(location => location.isMainLocation);

    if (!mainLocation?.id) return locations[0];

    return mainLocation;
}