import supabaseClient from "@/repositories/supabaseClient";
import { User } from "@prisma/client";

export default function FileService() {
    return {
        createFile: async ({ token, file, userId }: {
            token: string,
            file: File,
            userId: string | User['id'],
            type: 'restaurants' | 'dishes' | 'users',
            typeId: User['id']
        }) => {
            const fileName = file.name.replaceAll(' ', '_');
            const { data, error } = await supabaseClient(token)
                .storage
                .from('food-truck')
                .upload(`${userId}/${fileName}`, file, {
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
