import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { handleToken } from 'maronn-token-verify'
import { AccessToken } from 'maronn-token-verify/dist/types';




interface Payload extends AccessToken {
    userId: string
}

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
    async function configPayload() {
        try {
            const { accessToken } = await getAccessToken(req, res);
            if (!accessToken) {
                return {}
            }

            const payload = await handleToken<Payload>(
                accessToken,
                `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
                [process.env.AUTH0_AUDIENCE ?? ''],
                { useRefreshToken: false }
            );

            console.log(payload);

            return { userId: payload.userId };
        } catch (e) {
            console.log(e)
            return {}
        }
    }
    return await configPayload()
}

export type Context = inferAsyncReturnType<typeof createContext>
