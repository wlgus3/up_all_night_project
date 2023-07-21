//! 현재는 사용하지 않음 pagenation 때문에 /community/[page]로 대신 구현

import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Content from "./content";

// import { useRouter } from "next/router";
import { Metadata } from "next";
import CommunityWrapper from "./CommunityWrapper";

export const metadata: Metadata = {
  title: "UpperNightProject",
  description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 회원들과 소통하세요!",
};

export default async function Community() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const postcount: number = await db.collection("community").count();
  let page = 1;
  const result = await db
    .collection("community")
    .find()
    .sort({ _id: -1 })
    .skip((page - 1) * 6)
    .limit(6)
    .toArray();

  function pagecounter() {
    page += 1;
    console.log(page);
  }
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
