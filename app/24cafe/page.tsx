import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";
// import Map from "../component/map";
import dynamic from "next/dynamic";
import GoogleForm from "../component/googleForm";
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
      <h3>☕️ 24시 카페 지도 </h3>
      <div>
        1. 브라우저의 <span className="bold">위치엑세스</span>를 허용시 <span className="bold">현위치</span>중심 지도 표시
      </div>
      <div>
        2. <span className="bold">빨간색 핀</span>은 '현위치'입니다.(미허용시 현위치 홍대입구역으로 표시)
      </div>
      <div>3. 카페 정보열기는 핀 좌클릭, 정보닫기는 핀 우클릭입니다.</div>
      <div>
        4. 카페이름을 클릭하면 <span className="bold">카카오맵 링크</span>로 연결됩니다.
      </div>

      <div>
        5. <span className="bold">정보오류 및, 신규 24시 카페등록</span>은 <GoogleForm />을 이용해주세요!
      </div>

      <DynamicMap />
    </div>
  );
}
