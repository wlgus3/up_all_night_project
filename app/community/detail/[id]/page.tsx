import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function CommunityDetail() {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").findOne({ _id: new ObjectId("645ba7f0bda7f215d31ff55b") });
  console.log(result);

  return (
    <div>
      <div>
        <h2>글 제목 </h2>
        <div>
          <span>작성자</span>
          <span>작성일시 </span>
        </div>
        <div>글 내용 </div>
        <div>추천</div>
      </div>
      <div>
        <h3>댓글</h3>
        <div>댓글리스트 </div>
      </div>
    </div>
  );
}
