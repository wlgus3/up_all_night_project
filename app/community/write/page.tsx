"use client";

import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { useState, useEffect, useRef } from "react";

import dynamic from "next/dynamic";
// import QuillEditor from "../../component/Editor";
// import NewPostbyQuill from "./community/write/QuillEditor";
import NewPostbyQuill from "./QuillEditor";

export default async function CommunityDetail() {
  // const [html, setHtml] = useState("");

  // const [text, setText] = useState<string>("");

  // const handleText = (value: any) => {
  //   console.log(value);
  //   setText(value);
  // };

  // function contentChange(event: any) {
  //   console.log(event.target.value);
  // }
  return (
    <div>
      <h2>커뮤니티 글쓰기</h2>

      <div className="post_write">
        <NewPostbyQuill />

        {/* <EEditor onChange={() => contentChange(event)}></EEditor> */}
        {/* <QuillEditor /> */}
        {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
        {/* <textarea className="content_box" name="content" placeholder="내용" /> */}
        {/* <div> 연결된 노력이 있다면 선택해주세요  </div> */}
        <br />
        {/* ! 사진첨부기능 개발 전 */}
      </div>
    </div>
  );
}
