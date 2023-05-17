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
      {/* <form action="/api/list" method="POST">
        <button type="submit">완료</button>
      </form> */}
      <div className="p-20">
        <form action="/api/post/new" method="POST">
          {/* 키이름은 name ='~' , 칸 설명은 placeholder='~' */}
          <div>오늘의 노력을 간략하게 소개해주세요.</div>
          <input name="title" placeholder="제목" />
          <div>어떻게 성장할까요?</div>

          <input name="content" placeholder="내용" />
          {/* <div> 연결된 노력이 있다면 선택해주세요  </div> */}
          <br />
          <div>사진을 첨부하세요.(.jpg, .jpeg, .png 형식)</div>
          <input name="image" type="file" accept="image/jpg, image/jpeg, image/png" placeholder="사진을 첨부하세요" />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}
