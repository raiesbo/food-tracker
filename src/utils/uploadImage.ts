import { User } from "@prisma/client";
import { supagaseConfig } from "./settings";

type Props = {
    fileNamePath: string,
    type: 'restaurants' | 'dishes' | 'users',
    typeId: string | User['id'],
}

export default async function uploadImage({ fileNamePath, type, typeId }: Props) {
    const imageUrl = `${supagaseConfig.url}/storage/v1/object/public/food-truck/${fileNamePath}`;

    try {
        const response = await fetch(`/api/${type}/${typeId}`, {
            method: 'PUT',
            body: JSON.stringify(type === 'users' ? { user: { imageUrl } } : { imageUrl })
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
