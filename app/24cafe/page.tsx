import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
// import Map from "../component/map";
import dynamic from "next/dynamic";
export default async function Cafe() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  // console.log(result);
  const DynamicMap = dynamic(() => import("../component/map"), {
    loading: () => <p>지도를 불러오는중 ...</p>,
  });
  return (
    <div>
      <h2>24시 카페 지도 </h2>
      <div>1. 브라우저의 위치액세스를 허용하면 현재 위치의 지도 표시</div>
      <div>2. 빨간색 핀은 현재 위치입니다.(현재 위치 미허용시 현 위치 홍대입구역으로 표시)</div>
      <div>3. 카페 정보열기는 핀 좌클릭, 정보닫기는 핀 우클릭입니다.</div>
      <DynamicMap />
    </div>
  );
}
