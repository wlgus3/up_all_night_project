import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

// import { useRouter } from "next/router";

export default async function Community() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  console.log(result);

  return (
    <div>
      <h2>노력 자랑 게시판</h2>
      <div> 오늘의 노력에 대해서 자랑해주세요!</div>
      <div className="write_button">
        <Link href="/community/write">
          <button>글 작성하기 </button>
        </Link>
      </div>
      <div className="community">
        {result.map((el: string, index: number) => {
          return <Content element={el} key={index} />;
        })}
      </div>
    </div>
  );
}
function Content(props) {
  // let router = useRouter();
  let timeShortVer = String(props.element.date).split("GMT")[0];
  //Wed May 17 2023 17:21:37 GMT+0900 (대한민국 표준시) ->너무 길어서 GMT 이후로 버림

  return (
    <div className="post">
      <div>
        <Link href={`community/detail/${props.element._id}`} prefetch={false}>
          <div>{props.element.title}</div>
        </Link>
        {/* <div
          onClick={() => {
            router.push("/");
          }}
        >
          {props.element.title}
        </div> */}
        <div>작성시간: {timeShortVer}</div>
        <div>{props.element.content}</div>
        <div>추천: {props.element.score}</div>
      </div>
      <div className="post_image">{/* <Image alt="image" src={props.element.image} height="10" width="10"></Image> */}</div>
    </div>
  );
}
