import { supagaseConfig } from "./settings";

type Props = {
    userId: string | number,
    type: 'restaurants' | 'dishes' | 'users',
    typeId: string | number,
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
