import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
// ‘use client’
export default async function Community() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  console.log(result);

  return (
    <div>
      커뮤니티 페이지
      <div> 오늘의 노력에 대해서 자랑해주세요!</div>
      <div>
        {result.map((el, index) => {
          return <Content element={el} />;
        })}
      </div>
    </div>
  );
}

function Content(props) {
  return (
    <div>
      <div>{props.element.title}</div>
      <div>{props.element.content}</div>
    </div>
  );
}
