import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();

  return (
    <div className="map_page">
      <h2>메인 페이지</h2>
      <div>
        <span>맵ㅁㄴㅇㄹㅁㄹ</span>
      </div>
    </div>
  );
}
