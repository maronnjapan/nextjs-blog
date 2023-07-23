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

function TestJson() {
  const posts = trpc.getAllPosts.useQuery();
  return posts.data;
}

export default TestJson;
