"use client";
import type { NextPage } from "next";
import Head from "next/head";
// import { Container } from "@mui/material";
// import tw, { styled } from "twin.macro";
import React, { ReactElement, useEffect, useRef, useState } from "react";
// import Layout from "../components/Layout";
// import Quill from "quill";
const Quill = typeof window === "object" ? require("quill") : () => false;
import "quill/dist/quill.snow.css";

type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

// const MainContainer = styled(Container)(() => [
//   tw`relative text-center min-h-full`,
// ]);

const EEditor: NextPageWithLayout<any> = () => {
  const quillEditorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<typeof Quill>(null);
  // useEffect(() => {
  //   if (quillEditorRef.current) {
  //     const quill = new Quill(quillEditorRef.current, {
  //       theme: "snow",
  //       placeholder: "type something...",
  //     });
  //   }
  // }, [quillEditorRef]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("default");

  function titleChange(event: any) {
    setTitle(event.target.value);
  }
  function contentChange(delta: any) {
    console.log(delta);
    setContent(delta);
  }

  function postFunction(delta: any) {
    console.log(title);
    console.log(content);
    const contentdata = delta;
    fetch("/api/post/new", { method: "POST", body: JSON.stringify({ title: title, content: contentdata }) });
  }
  useEffect(() => {
    //quillRef.current 할당
    quillRef.current = new Quill(quillEditorRef.current, {
      theme: "snow",
      placeholder: "type something...",
    });
  }, []);

  return (
    <div>
      <div>
        {/* 키이름은 name ='~' , 칸 설명은 placeholder='~' */}
        <div>오늘의 노력을 간략하게 소개해주세요.</div>
        <input className="title_box" name="title" placeholder="제목" onChange={titleChange} />

        <div>어떻게 성장할까요?</div>

        <Head>
          <title>Editor</title>
        </Head>
        <main>
          <div
            ref={quillEditorRef}
            // onChange={() => {
            //   var delta = quillRef.current && quillRef.current.getContents();
            //   // console.log(delta);
            //   // setText(delta);
            // }}
          ></div>
        </main>

        {/* <button
            onClick={() => {
              //quillRef로 접근.
              var delta = quillRef.current && quillRef.current.getContents();
              console.log("델타", delta);

              // setText(delta);
            }}
          >
            저장
          </button> */}

        <button
          onClick={() => {
            var delta = quillRef.current && quillRef.current.getContents();

            // contentChange(delta);
            postFunction(delta);
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};
export default EEditor;

EEditor.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};
