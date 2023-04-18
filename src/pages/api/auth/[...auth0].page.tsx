import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const payload = {
        userId: session.user.sub,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET as Secret);

    return session;
};

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            const { status, message } = error as { status?: number, message: string };
            res.status(status || 500).end(message);
        }
    },
});
