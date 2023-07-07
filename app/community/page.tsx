import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Content from "./content";

// import { useRouter } from "next/router";

export default async function Community() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  // console.log(result);

  return (
    <div>
      <h2> 노력 자랑 게시판</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div> 오늘의 노력에 대해서 자랑해주세요!</div>
        <div className="write_button">
          <Link href="/community/write">
            <button>글 작성하기 ✏️ </button>
          </Link>
        </div>
      </div>
      <div className="community">
        {result.map(
          (
            el: {
              date: string;
              _id: string;
              title: string;
              content: string;
              score: number;
            },
            index: number
          ) => {
            return (
              <Content
                element={el}
                key={index}
                // result={result}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
