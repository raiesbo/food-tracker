# Food Tracker

Description here...

## Getting Started

1. Create a `.env` and a `.env.local` files where to save the Env variables described in the following section.
2. Install the project dependencies with `npm install`.
3. Build the project with `npm run build`.
4. Start production environment with `npm run start` and open [http://localhost:3000](http://localhost:3000) to see the results.

## Environment Variables

- `DATABASE_URL`: It is the only one that it is saved in the `.env` file and corresponds to the Data Base conneciton URL.
- `AUTH0_SECRET`: Can be any token generated with `openssl rand -hex 32`.
- `AUTH0_DOMAIN`: Something
- `AUTH0_POST_LOGOUT_REDIRECT`: Something
- `AUTH0_CONNECTION`: Something
- `AUTH0_DEFAULT_PASSWORD`: Something
- `AUTH0_BASE_URL`: Something
- `AUTH0_ISSUER_BASE_URL`: Something
- `AUTH0_CLIENT_ID`: Auth0 client id for the applications authentication.
- `AUTH0_CLIENT_SECRET`: Auth0 client secret for the applications authentication.
- `AUTH0_CLIENT_ID_API`: Auth0 client id for the Matchine-to-Machine Application.
- `AUTH0_CLIENT_SECRET_API`: Auth0 client secret for the Matchine-to-Machine Application.
- `DROPBOX_API_TOKEN`: Dropbox connection token to store images and other files. Can be found in the App section. 

## Technologies

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Auth0 SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Dropbox SDK](https://dropbox.github.io/dropbox-sdk-js/)
- [MongoDB](https://www.mongodb.com/)
- [GitHub Actions](https://github.com/features/actions)
- [Vitest](https://vitest.dev/)
