import { createClient } from '@supabase/supabase-js';

export default function supabaseClient(access_token: string) {
    const options = { global: {} };

    if (access_token) {
        options.global = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        options
    );
}
