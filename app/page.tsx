import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  // console.log(result);

  return (
    <div>
      메인
      <div> {result[0]["title"]}</div>
      <div> {result[0]["content"]}</div>
    </div>
  );
}
