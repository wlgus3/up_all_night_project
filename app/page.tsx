import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
import dynamic from "next/dynamic";
export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();

  const DynamicMap = dynamic(() => import("./component/map"), {
    loading: () => <p>지도를 불러오는중 ...</p>,
  });

  return (
    <div className="map_page">
      <h2>메인 페이지</h2>
      <div>
        <h3>24시 카페모음 </h3>
        <DynamicMap />
      </div>
    </div>
  );
}
