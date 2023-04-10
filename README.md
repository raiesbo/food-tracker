# Food Tracker

Description here...

## Getting Started

### Setup

1. Install the correct Node.js version specified in `.nvmcr`.
2. Install all the project dependencies with `npm install`.
3. Create the `.env` and `.env.local` files and add the variables specified below.

### Run

#### Development

1. Start the server with `npm run dev`

#### Production

1. Build the application with `npm run build`
2. Start the server with `npm run start`

## Environment Variables

- `DATABASE_URL`: It is the only one that it is saved in the `.env` file and corresponds to the Data Base conneciton URL.
- `AUTH0_SECRET`: Can be any token generated with `openssl rand -hex 32`.
- `AUTH0_DOMAIN`: Url of the Auth0 application to handle the user management API.
- `AUTH0_CONNECTION`: Connection name of the data base where users are found.
- `AUTH0_CONNECTION_ID`: Connection id of the data base where users are stored in auth0.
- `AUTH0_DEFAULT_PASSWORD`: Default password for user creation.
- `AUTH0_BASE_URL`: String telling Auth0 where the application is running like `http://localhost:3000`.
- `AUTH0_ISSUER_BASE_URL`: Url defined automatically by Auth0 to define and validate the app.
- `AUTH0_CLIENT_ID`: Auth0 client id for the applications authentication.
- `AUTH0_CLIENT_SECRET`: Auth0 client secret for the applications authentication.
- `AUTH0_CLIENT_ID_API`: Auth0 client id for the Matchine-to-Machine Application.
- `AUTH0_CLIENT_SECRET_API`: Auth0 client secret for the Matchine-to-Machine Application.
- `DROPBOX_API_TOKEN`: Dropbox connection token to store images and other files. Can be found in the App section (To be implemented).

## Technologies

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Auth0 SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Dropbox SDK](https://dropbox.github.io/dropbox-sdk-js/)
- [MongoDB](https://www.mongodb.com/)
- [GitHub Actions](https://github.com/features/actions)
- [Vitest](https://vitest.dev/)
