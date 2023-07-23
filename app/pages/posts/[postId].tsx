import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import path from "path";
import Layout from "@/components/Layout";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import styled from "styled-components";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const writeFolderPath = path.join(process.cwd(), "public/files");

const RegisterBtn = styled.button`
  min-width: 100px;
  border-radius: 5px;
  background-color: greenyellow;
  border-color: transparent;
  padding: 0.5em 1em;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 1em;
  display: flex;
  align-items: center;
`;
const FormHeaderItem = styled.div`
  margin-left: 1em;
`;

const DownloadLink = styled.a`
  min-width: 100px;
  border-radius: 5px;
  background-color: greenyellow;
  border-color: transparent;
  padding: 0.5em 1em;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  &:hover {
    opacity: 0.8;
  }
`;

interface UserInfo extends UserProfile {
  userId?: string;
}
const EditPost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const post = trpc.getPostById.useQuery(Number(postId));

  const [value, setValue] = useState<string | undefined>(post.data?.content);

  useEffect(() => {
    setValue(post.data?.content);
  }, [post.data?.content]);

  const createFile = trpc.createCode.useMutation();
  const createPost = trpc.updatePost.useMutation();
  const authUser = useUser();
  const userInfo: UserInfo | undefined = authUser.user;

  const update = () => {
    if (!value) {
      alert("なにか記載してください。");
      return;
    }

    try {
      if (!post.data?.id) {
        throw new PageNotFoundError("存在しない投稿のため更新できません。");
      }
      createPost
        .mutateAsync({
          id: post.data.id,
          content: value,
        })
        .then(() => alert("更新しました"))
        .catch(() => alert("エラーが発生したため更新できませんでした。"));
    } catch (e) {
      throw e;
    }
  };

  const updateFile = () => {
    const firstPreviewText = document.querySelector<HTMLElement>(
      ".w-md-editor-preview"
    );
    firstPreviewText
      ?.querySelectorAll(".copied")
      .forEach((elm) => elm.remove());
    const insertCode = firstPreviewText?.outerHTML;
    console.log(insertCode);

    createFile.mutate({
      readFilePath: "/styles/markdown.css",
      htmlCode: insertCode ?? "",
      addCssText: `.code-line {
        display: block;
        height: 20px;
    }
  
    .wmde-markdown pre>code {
        overflow: visible;
    }`,
      writeFilePath: `${writeFolderPath}/${post.data?.title ?? "test"}.html`,
    });
  };

  return (
    <Layout>
      <Head>
        <title>最初のブログ</title>
      </Head>
      <h2>タイトル:{post.data?.title}</h2>

      <FormHeader>
        <FormHeaderItem>
          {(userInfo?.userId === post.data?.user_id || !post.data?.user) && (
            <RegisterBtn onClick={update}>更新</RegisterBtn>
          )}
        </FormHeaderItem>
        <FormHeaderItem>
          <DownloadLink
            href={`${location.origin}/files/${post.data?.title}.html`}
            download={`${post.data?.title}.html`}
          >
            HTML発行
          </DownloadLink>
        </FormHeaderItem>
        <FormHeaderItem>
          <Link href={"/"}>ホームへ戻る</Link>
        </FormHeaderItem>
      </FormHeader>
      {post.isError && <div>エラーが発生しました</div>}
      {post.isLoading && <div>ローディング中</div>}
      {post.data?.content && (
        <MDEditor
          value={value}
          onChange={setValue}
          onBlur={updateFile}
          height={500}
        />
      )}
    </Layout>
  );
};

export default EditPost;
