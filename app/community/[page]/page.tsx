import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Content from "../content";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UpperNightProject",
  description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 회원들과 소통하세요!",
  openGraph: {
    title: "UpperNightProject",
    description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 회원들과 소통하세요!",
  },
};

export default async function Community({
  params, //쿼리데이터 가져오기위한 코드
  searchParams,
}: {
  params: { page: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const client = await connectDB;
  const db = client.db("uppernight");
  const postcount: number = await db.collection("community").count();
  console.log(params.page);
  //페이지네이션을 어떤식으로 구성할지 설정
  let page = Number(params.page);
  const result = await db
    .collection("community")
    .find()
    .sort({ _id: -1 })
    .skip((page - 1) * 6)
    .limit(6)
    .toArray();

  return (
    <div>
      <h2> 👏 오늘 나의 노력을 마음껏 자랑해주세요! </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div> 🔥 열정적으로 보낸 오늘 하루를 공유하고, 서로 격려하는 게시판입니다.</div>
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
      <div className="pagination_box">
        <div>
          {page != 1 ? (
            <Link href={`community/${page - 1}`}>
              <button>이전 페이지</button>
            </Link>
          ) : null}
        </div>
        <div> {page}</div>
        <div>
          <Link href={`community/${page + 1}`}>
            <button>다음 페이지</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
