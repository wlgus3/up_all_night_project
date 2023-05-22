import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
import Map from "../component/map";
export default async function Cafe() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  // console.log(result);

  return (
    <div>
      <h2>카페 지도페이지 </h2>
      <Map />
    </div>
  );
}
