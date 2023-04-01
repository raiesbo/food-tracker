export const auth0Config = {
    clientId: process.env.AUTH0_CLIENT_ID_API,
    clientSecret: process.env.AUTH0_CLIENT_SECRET_API,
    auth0Domain: process.env.AUTH0_DOMAIN,
    connection: process.env.AUTH0_CONNECTION,
    metadata: 'https://food-tracker-tfm.vercel.app/user_metadata'
};

export const dropboxConfig = {
    apiToken: process.env.DROPBOX_API_TOKEN
}