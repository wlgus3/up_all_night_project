"use client";

import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { useState } from "react";

import dynamic from "next/dynamic";
import QuillEditor from "../../component/Editor";

export default async function CommunityDetail() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").findOne({ _id: new ObjectId(props.params.id) });
  // //! .findOne({키:값}) 을 적으면 조건에 해당하는 data만 찾아온다.
  // console.log(result);
  // console.log(props);
  const [html, setHtml] = useState("");

  const [text, setText] = useState<string>("");

  const handleText = (value) => {
    console.log(value);
    setText(value);
  };

  return (
    <div>
      <h2>커뮤니티 글쓰기</h2>

      <div className="post_write">
        <form action="/api/post/new" method="POST">
          {/* 키이름은 name ='~' , 칸 설명은 placeholder='~' */}
          <div>오늘의 노력을 간략하게 소개해주세요.</div>
          <input className="title_box" name="title" placeholder="제목" />
          <div>어떻게 성장할까요?</div>

          {/* <QuillEditor name="content" />
          <div dangerouslySetInnerHTML={{ __html: text }} /> */}
          <textarea className="content_box" name="content" placeholder="내용" />
          {/* <div> 연결된 노력이 있다면 선택해주세요  </div> */}
          <br />
          <div>아래에 사진을 첨부하세요. (.jpg, .jpeg, .png 형식만 가능, 1MB 용량제한) </div>
          <input name="image" type="file" accept="image/jpg, image/jpeg, image/png" placeholder="사진을 첨부하세요" />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}
