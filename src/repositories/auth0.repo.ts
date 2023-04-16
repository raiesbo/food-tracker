import { User } from "@prisma/client";

export default function auth0Client() {
    return {
        getManagementApiToken: ({ clientId, clientSecret, auth0Domain }: {
            clientId?: string,
            clientSecret?: string,
            auth0Domain?: string
        }) => {
            return fetch(`https://${auth0Domain}/oauth/token`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                    client_id: `${clientId}`,
                    client_secret: `${clientSecret}`,
                    audience: `https://${auth0Domain}/api/v2/`,
                })
            });
        },
        createUser: ({ auth0Domain, accessToken, body }: {
            auth0Domain?: string,
            accessToken: string,
            body: Partial<User>
        }) => {
            return fetch(`https://${auth0Domain}/api/v2/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(body)
            });
        }
    };
}
