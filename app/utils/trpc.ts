import { AppRouter } from '@/server/routers/_app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { NextPageContext } from 'next';
import Cookies from 'js-cookie';
function getBaseUrl() {

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter, NextPageContext>({
    config({ ctx }) {
        return {
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/ssr
                     **/
                    url: `${getBaseUrl()}/api/trpc`,

                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            
                        };
                    },
                }),
            ],
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: true,
});