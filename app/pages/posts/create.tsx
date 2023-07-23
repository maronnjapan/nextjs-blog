import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { trpc } from "@/utils/trpc";
import path from "path";
import Layout from "@/components/Layout";
// import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
// import { marked } from "marked";
// import DOMPurify from "dompurify";
// import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import styled from "styled-components";
import { useRouter } from "next/router";

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

const FormItem = styled.div`
  margin-bottom: 1em;
`;

const LastFormItem = styled(FormItem)`
  margin-bottom: 0;
`;

const CreatePost = () => {
  // marked.setOptions({
  //   highlight: (code, lang) => {
  //     return highlightjs.highlightAuto(code, [lang]).value;
  //   },
  // });
  // const [markdownValue, setMarkdownValue] = useState("Initial value");

  // const onChange = (value: string) => {
  //   setMarkdownValue(value);
  // };

  const router = useRouter();

  const [value, setValue] = useState<string | undefined>("");
  const [title, setTitle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  const createFile = trpc.createCode.useMutation();
  const createPost = trpc.createPost.useMutation();

  const createHtmlFile = () => {
    const firstPreviewText = document.querySelector<HTMLElement>(
      ".w-md-editor-preview"
    );
    firstPreviewText
      ?.querySelectorAll(".copied")
      .forEach((elm) => elm.remove());
    const insertCode = firstPreviewText?.outerHTML;
    if (!insertCode || !value) {
      alert("なにか記載してください。");
      return;
    }

    try {
      createPost.mutate({
        title,
        content: value,
      });
      createFile
        .mutateAsync({
          readFilePath: "/styles/markdown.css",
          htmlCode: insertCode,
          addCssText: `.code-line {
          display: block;
          height: 20px;
      }
    
      .wmde-markdown pre>code {
        overflow: visible;
        overflow-x: auto;
      }`,
          writeFilePath: `${writeFolderPath}/${title}.html`,
        })
        .then(async (data) => {
          alert("登録しました");
          const downloadElm = document.getElementById("download-elm");
          downloadElm?.click();
        });
    } catch (e) {
      throw e;
    }
  };

  return (
    <Layout>
      <Head>
        <title>最初のブログ</title>
      </Head>
      <h1>新規登録</h1>
      <FormItem>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onInput={(e) => {
            setTitle(e.currentTarget.value);
            setHtmlCode(
              `${location.origin}/files/${e.currentTarget.value}.html`
            );
          }}
        />
      </FormItem>
      {/* <SimpleMde value={markdownValue} onChange={onChange} /> */}

      <FormItem>
        <MDEditor value={value} onChange={setValue} height={500} />
      </FormItem>
      <LastFormItem>
        <RegisterBtn onClick={createHtmlFile}>登録する</RegisterBtn>
        <Link href="/">ホームに戻る</Link>
      </LastFormItem>

      <a href={htmlCode} download={title + ".html"} id="download-elm"></a>
      <div>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked(markdownValue)),
          }}
        ></div> */}
      </div>
    </Layout>
  );
};

export default CreatePost;
