import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function CommunityDetail(props) {
  // const client = await connectDB;
  // const db = client.db("uppernight");
  // const result = await db.collection("community").findOne({ _id: new ObjectId(props.params.id) });
  // //! .findOne({키:값}) 을 적으면 조건에 해당하는 data만 찾아온다.
  // console.log(result);
  // console.log(props);

  return (
    <div>
      <h2>커뮤니티 글쓰기</h2>
    </div>
  );
}
