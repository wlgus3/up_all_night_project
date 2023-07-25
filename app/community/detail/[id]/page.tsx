// "use client";
import { MongoClient, ObjectId } from "mongodb";

import { connectDB } from "@/util/database";
import Link from "next/link";
import DeleteButton from "./deletebutton";
import Comment from "@/app/component/comment";
import NotFound from "../not-found";
interface ContentProps {
  params: {
    id: string;
  };
}

export default async function CommunityDetail(props: ContentProps) {
  const client: any = await connectDB;
  const db = client.db("uppernight");
  console.log(props.params.id);
  const result = await db.collection("community").findOne({ _id: new ObjectId(props.params.id) });
  //! .findOne({키:값}) 을 적으면 조건에 해당하는 data만 찾아온다.
  console.log(result);
  let timeShortVer = String(result.date).split("GMT")[0];

  //! 아래는 result.content의 delta 형식을 html 형식으로 변환하기 위한 코드
  var html = undefined;
  if (result.content != undefined) {
    if (result.content[0] !== "{" || result.content == "") {
      //? 예전에 작성했던 글이 quill의 delta 형식이 아니기 때문에  에러나는 것 방지하기 위해서 분기
      html = undefined;
    } else {
      var QuillDeltaToHtmlConverter = require("quill-delta-to-html").QuillDeltaToHtmlConverter;
      var cfg = {};
      // console.log(JSON.parse(result.content));
      var converter = new QuillDeltaToHtmlConverter(JSON.parse(result.content).ops, cfg);
      html = converter.convert();
    }
  }

  if (result === null) {
    return NotFound();
  } else {
    return (
      <div>
        <h2>노력 자랑 게시판 </h2>
        <article className="post_detail">
          <div className="post_detail_info">
            <h2>
              제목: {result.title}
              {/* 에디터 넣고 일단 수정하기 기능은 잠시 제거  */}
              {/* <div className="right">
                <Link href={"/community/edit/" + result._id} className="list-btn">
                  <button>수정하기 ✏️</button>
                </Link>
              </div> */}
            </h2>

            <div>
              <div>작성자 : {result.author}</div>
              <div>작성일시 : {timeShortVer}</div>
            </div>
          </div>
          <div className="post_detail_content">
            {/* {html!=undefined?<div dangerouslySetInnerHTML={{ __html: html }} ><div/>?<div></div>} */}
            {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : result.content}
            {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
          </div>
        </article>
        <Comment parent={result._id} />
        <div className="right">
          <DeleteButton _id={result._id} />
        </div>
      </div>
    );
  }
}
