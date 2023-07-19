import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import dynamic from "next/dynamic";
import GoogleForm from "./component/googleForm";

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();

  const DynamicMap = dynamic(() => import("./component/map"), {
    loading: () => <p>지도를 불러오는중 ...</p>,
  });

  return (
    <div className="map_page">
      <h2>안녕하세요 Upper Night입니다!</h2>
      <div>✔️ Upper Night는 밤샘몰입을 즐기며 빠른 성장을 추구하는 사람들을 위한 공간입니다.</div>
      <div>✔️ 현재는 24시 카페와 심야영업 카페를 모아서 보여주는 서비스를 제공하고 있습니다.</div>
      <div>✔️ 함께 성장하기 위한 다양한 서비스를 준비중이니 기대해주세요! </div>
      <div>
        <h3>☕️ 24시 카페 지도 </h3>

        <div>
          1. 브라우저의 <span className="bold">위치엑세스</span>를 허용시 <span className="bold">현위치</span>중심 지도 표시
        </div>
        <div>
          2. <span className="bold">빨간색 핀</span>은 '현위치'입니다.(미허용시 현위치 홍대입구역으로 표시)
        </div>
        <div>
          3. <span className="bold">카페 정보열기는 핀 좌클릭, 정보닫기는 핀 우클릭</span>입니다.
        </div>
        <div>
          4. 카페이름을 클릭하면 <span className="bold">카카오맵 링크</span>로 연결됩니다.
        </div>
        <div>
          5. <span className="bold">정보오류 및, 신규 24시 카페등록</span>은 <GoogleForm />을 이용해주세요!
        </div>

        <DynamicMap />
      </div>
    </div>
  );
}
