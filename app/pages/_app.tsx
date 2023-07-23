import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import type { AppProps, AppType } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default trpc.withTRPC(MyApp);
