"use client";
import type { NextPage } from "next";
import Head from "next/head";
import React, { ReactElement, useEffect, useRef, useState } from "react";
const Quill = typeof window === "object" ? require("quill") : () => false;
import "quill/dist/quill.snow.css";
// import { useRouter } from "next/navigation";

type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

const NewPostbyQuill: NextPageWithLayout<any> = () => {
  const quillEditorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<typeof Quill>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("default");
  const [imageSrcUrl, setImageSrcUrl] = useState("");

  function titleChange(event: any) {
    setTitle(event.target.value);
  }

  // const router = useRouter();
  function postFunction(delta: any) {
    console.log(title);
    console.log(content);
    console.log(imageSrcUrl);
    const contentdata = delta;
    fetch("/api/post/new", { method: "POST", body: JSON.stringify({ title: title, content: contentdata, imageurl: imageSrcUrl }) })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => alert(res));
    // router.push("/community/1");//!라우팅은 되지만 리로드가 안되어서 최신 데이터가 안옴
    window.location.href = "/community/1"; //! 이 방식으로 하면 게시 성공 후 리로드 가능
  }
  useEffect(() => {
    //quillRef.current 할당
    quillRef.current = new Quill(quillEditorRef.current, {
      theme: "snow",
      placeholder: "type something...",
    });
  }, []);

  //! presigned url response type
  interface PresignedPostResponse {
    url: string;
    fields: {
      [key: string]: string;
    };
  }
  return (
    <div>
      <div>
        {/* 키이름은 name ='~' , 칸 설명은 placeholder='~' */}
        <div>오늘의 노력을 간략하게 소개해주세요.</div>
        <input className="title_box" name="title" placeholder="제목" onChange={titleChange} />

        <div>어떻게 성장할까요?</div>

        <div className="Quill_editor">
          <Head>
            <title>Quill Editor</title>
          </Head>
          <main>
            <div ref={quillEditorRef}></div>
          </main>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={async (event: any) => {
            let file = event.target.files[0];
            let filename = encodeURIComponent(file.name);
            console.log(filename);
            let resBeforeJson: Response = await fetch("/api/post/image?file=" + filename);
            let res: PresignedPostResponse = await resBeforeJson.json();
            console.log(res);
            //S3 업로드

            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value as string | Blob);
            });
            let ImageUploadResult = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(ImageUploadResult);

            if (ImageUploadResult.ok) {
              setImageSrcUrl(ImageUploadResult.url + "/" + filename);
            } else {
              console.log("실패");
            }
          }}
        />
        <img src={imageSrcUrl} />
        <div></div>
        {/* 선택이미지 보여주려면 1.createObjectURL메서드 쓰거나 2.이미지를 바로 업로드해버리거나->Presingned URL방식으로 하면 서버쪽에서 비효율문제 없음 */}
        <button
          onClick={() => {
            // quillRef로 접근
            var delta = quillRef.current && quillRef.current.getContents();
            postFunction(delta);
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};
export default NewPostbyQuill;

NewPostbyQuill.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};
