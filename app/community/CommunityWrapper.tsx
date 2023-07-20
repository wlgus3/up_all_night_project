"use client";
import { connectDB } from "@/util/database";
import Content from "./content";
import Pagebox from "../component/Pagebox";

export default function CommunityWrapper(props: any) {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // // const postcount: number = await db.collection("community").count();
  // const result = await db.collection("community").find().sort({ _id: -1 }).toArray();
  // // console.log(result);
  let result = props.result;
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
