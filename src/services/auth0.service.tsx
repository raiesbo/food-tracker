import { NextApiRequest } from 'next';
import { auth0Client } from '../repositories';

type Props = {
    auth0Client: typeof auth0Client
}


export default function auth0Service({ auth0Client }: Props) {
    const { getManagementApiToken, createUser } = auth0Client();
    return {
        createAuth0User: async (req: NextApiRequest, userId: string = '') => {
            const parsedBody = JSON.parse(req.body)

            try {
                const response = await getManagementApiToken({
                    clientId: process.env.AUTH0_CLIENT_ID,
                    clientSecret: process.env.AUTH0_CLIENT_SECRET,
                    auth0Domain: process.env.AUTH0_DOMAIN
                })

                if (!response.ok) return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to get API Token to create Auth0 user'
                    }
                }

                const tokenData = await response.json();

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
                    connection: `${process.env.AUTH0_CONNECTION}`,
                    verify_email: false
                }

                const createUserResponse = await createUser({
                    auth0Domain: process.env.AUTH0_DOMAIN,
                    accessToken: tokenData.access_token,
                    body
                });

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