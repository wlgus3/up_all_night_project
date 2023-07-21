// "use client";

//? 원래는 페이지네이션을 구현하기 위해서 클라이언트 컴포넌트로 만들어서 활용하려했지만 실패
//! 클라이언트 컴포넌트 안에는 async await을 사용할 수 없다고 한다 그 대신 use() hook을 지원할 예정이라고 함

import { connectDB } from "@/util/database";
import Content from "./content";
import Pagebox from "../component/Pagebox";

export default async function CommunityWrapper(props: any) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const postcount: number = await db.collection("community").count();
  const result = await db.collection("community").find().sort({ _id: -1 }).toArray();

  // let result = props.result;
  return (
    <div>
      <div className="community">
        {result?.map((el: any, index: number) => {
          return (
            <Content
              element={el}
              key={index}
              // result={result}
            />
          );
        })}
      </div>
      <Pagebox postcount={props.postcount} />
    </div>
  );
}
