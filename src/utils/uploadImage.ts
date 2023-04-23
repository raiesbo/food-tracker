import { User } from "@prisma/client";
import { supagaseConfig } from "./settings";

type Props = {
    userId: string | User['id'],
    type: 'restaurants' | 'dishes' | 'users',
    typeId: string | User['id'],
    extension: string
}

export default async function uploadImage({ userId, type, typeId, extension }: Props) {
    const imageUrl = `${supagaseConfig.url}/storage/v1/object/public/food-truck/${userId}/${type}_${typeId}.${extension}`;

    try {
        const response = await fetch(`/api/${type}/${typeId}`, {
            method: 'PUT',
            body: JSON.stringify({ imageUrl })
        });

        if (!response.ok) {
            return null;
        } else {
            return imageUrl;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
