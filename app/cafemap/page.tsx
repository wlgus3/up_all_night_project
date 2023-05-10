import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Cafe() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  // console.log(result);

  return <div>카페 지도페이지.</div>;
}
