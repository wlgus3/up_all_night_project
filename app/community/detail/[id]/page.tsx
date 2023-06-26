// "use client";
// `use client`;
// "use client";
import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import Link from "next/link";
import DeleteButton from "./deletebutton";
import Comment from "@/app/component/comment";
export default async function CommunityDetail(props) {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").findOne({ _id: new ObjectId(props.params.id) });
  //! .findOne({키:값}) 을 적으면 조건에 해당하는 data만 찾아온다.
  // console.log(result);
  // console.log(props);
  let timeShortVer = String(result.date).split("GMT")[0];

  return (
    <div>
      <h2>노력 자랑 게시판 </h2>
      <div className="post_detail">
        <div className="post_detail_info">
          <h3>
            제목: {result.title}
            <div className="right">
              <Link href={"/community/edit/" + result._id} className="list-btn">
                <button>수정하기 ✏️</button>
              </Link>
            </div>
          </h3>

          <div>
            <div>작성자 : </div>
            <div>작성일시 : {timeShortVer}</div>
          </div>
        </div>
        <div className="post_detail_content">
          <div>{result.content} </div>
          <div>추천 : {result.score}</div>
        </div>
      </div>
      <Comment parent={result._id} />
      <div className="right">
        <DeleteButton _id={result._id} />
      </div>
    </div>
  );
}
