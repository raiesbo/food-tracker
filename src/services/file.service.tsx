import supabaseClient from "@/repositories/supabaseClient";
import { User } from "@prisma/client";

export default function FileService() {
    return {
        createFile: async ({ token, file, userId, type, typeId, format }: {
            token: string,
            file: File,
            userId: string | User['id'],
            type: 'restaurants' | 'dishes' | 'users',
            format: 'png' | 'jpg' | 'webp' | 'svg'
            typeId: User['id']
        }) => {
            const { data, error } = await supabaseClient(token)
                .storage
                .from('food-truck')
                .upload(`${userId}/${type}_${typeId}.${format}`, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (error) {
                console.error(error);
                return {
                    result: null,
                    error: {
                        status: 400,
                        message: error.message
                    }
                };
            }

            return { result: data };
        }
    };
}
