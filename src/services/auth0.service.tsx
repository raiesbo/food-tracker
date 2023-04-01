import { auth0Config } from '@/utils/settings';
import { NextApiRequest } from 'next';
import { auth0Client } from '../repositories';

type Props = {
    auth0Client: typeof auth0Client
}

const { clientId, clientSecret, auth0Domain, connection } = auth0Config;


export default function auth0Service({ auth0Client }: Props) {
    const { getManagementApiToken, createUser } = auth0Client();

    return {
        createAuth0User: async (req: NextApiRequest, userId: string = '') => {
            const parsedBody = JSON.parse(req.body)

            try {
                const response = await getManagementApiToken({ clientId, clientSecret, auth0Domain })

                if (!response.ok) return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to get API Token to create Auth0 user'
                    }
                }

                const { access_token: accessToken } = await response.json();

                const { email, firstName, lastName, password, isSP } = parsedBody;

                const body = {
                    email,
                    password,
                    user_metadata: { 'user_id': userId, role: isSP ? 'SP' : 'CUSTOMER' },
                    blocked: false,
                    email_verified: true,
                    given_name: firstName,
                    family_name: lastName,
                    name: `${firstName} ${lastName}`,
                    connection,
                    verify_email: false
                }

                const createUserResponse = await createUser({ accessToken, auth0Domain, body });

                if (!createUserResponse.ok) return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to create Auth0 user'
                    }
                }

                const user = await createUserResponse.json();

                return { result: user };

            } catch (e) {
                console.error(e)
                const { message } = e as { message: string }
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        }
    }
}