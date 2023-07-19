import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Content from "./content";

// import { useRouter } from "next/router";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "UpperNightProject",
  description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 회원들과 소통하세요!",
};

export default async function Community() {
  interface element {
    date: string;
    _id: string;
    title: string;
    content: string;
    score: number;
  }

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
        {result?.map((el, index) => {
          return (
            <Content
              element={el}
              key={index}
              // result={result}
            />
          );
        })}
      </div>
    </div>
  );
}
