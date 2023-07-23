import { Inter } from "next/font/google";
import Link from "next/link";
import Layout from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { string } from "zod";

const inter = Inter({ subsets: ["latin"] });

interface UserInfo extends UserProfile {
  readonly userId: string;
}

function Home() {
  const authUser = useUser();
  const userData = authUser.user as UserInfo | undefined;

  const posts = trpc.getAllPosts.useQuery();
  return (
    <Layout>
      {/* ログインリンクの追加 */}
      <div>{!userData && <Link href="/api/auth/login">Login</Link>}</div>
      <Link href="/posts/create">新規投稿</Link>
      <ul>
        {posts.data?.map((post) => (
          <li key={post.id}>
            <Link href={"posts/" + post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default Home;
