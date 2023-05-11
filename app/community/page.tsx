import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
import styles from "./page.module.css";
import Link from "next/link";
`use client`;
export default async function Community() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  console.log(result);

  return (
    <div>
      <h2>커뮤니티 페이지</h2>
      <div> 오늘의 노력에 대해서 자랑해주세요!</div>
      <div className="community">
        {result.map((el: string, index: number) => {
          return <Content element={el} key={index} />;
        })}
      </div>
    </div>
  );
}

function Content(props) {
  return (
    <div className="post">
      <div>
        <Link href={`community/detail/${props.element._id}`}>
          <div>{props.element.title}</div>
        </Link>

        <div>{props.element.content}</div>
        <div>추천: {props.element.score}</div>
      </div>
      <div className="post_image">image</div>
    </div>
  );
}
