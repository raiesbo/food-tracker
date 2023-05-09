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
- `AUTH0_BASE_URL`: String telling Auth0 where the application is running like `http://localhost:3000`.
- `AUTH0_ISSUER_BASE_URL`: Url defined automatically by Auth0 to define and validate the app.
- `AUTH0_CLIENT_ID`: Auth0 client id for the applications authentication.
- `AUTH0_CLIENT_SECRET`: Auth0 client secret for the applications authentication.
- `AUTH0_CLIENT_ID_API`: Auth0 client id for the Matchine-to-Machine Application.
- `AUTH0_CLIENT_SECRET_API`: Auth0 client secret for the Matchine-to-Machine Application.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project's base URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key to secure Supabase client libraries.
- `SUPABASE_JWT_SECRET`: Token to decode supabase JWT and create your own ones.

## Technologies

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Auth0 SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [MongoDB](https://www.mongodb.com/)
- [GitHub Actions](https://github.com/features/actions)
- [Vitest](https://vitest.dev/)
- [Supabase](https://supabase.com/docs)
