import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';
import { createContext } from '@/server/context';
import { getAccessToken } from '@auth0/nextjs-auth0';
import next from 'next/types';
// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
});