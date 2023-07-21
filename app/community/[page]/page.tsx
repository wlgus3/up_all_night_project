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
  // let page = 1; //일단 초기페이지?
  console.log(params);
  console.log(searchParams);
  let page = Number(params.page);
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
      {page != 1 ? (
        <Link href={`community/${page - 1}`}>
          <button>이전 페이지</button>
        </Link>
      ) : null}

      <div> {page}</div>

      <Link href={`community/${page + 1}`}>
        <button>다음 페이지</button>
      </Link>

      {/* <Pagebox postcount={postcount} /> */}
    </div>
  );
}
