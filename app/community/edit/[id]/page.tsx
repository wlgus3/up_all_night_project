import { MongoClient, ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

interface editContentProps {
  params: {
    id: string;
  };
}

export default async function EditCommunityDetail(props: editContentProps) {
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").findOne({ _id: new ObjectId(props.params.id) });
  //! .findOne({키:값}) 으로 수정할 글 정보만 get 해오기
  // console.log(result);
  // console.log(props);

  return (
    <div>
      <h2>글 수정하기</h2>

      <div className="post_write">
        <form action="/api/post/edit" method="POST">
          {/* 키이름은 name ='~' , 칸 설명은 placeholder='~' */}
          <div>오늘의 노력을 간략하게 소개해주세요.</div>
          <input className="title_box" name="title" placeholder="제목" defaultValue={result.title} />
          <div>어떻게 성장할까요?</div>

          <textarea className="content_box" name="content" placeholder="내용" defaultValue={result.content} />
          {/* <div> 연결된 노력이 있다면 선택해주세요  </div> */}
          <br />
          <div style={{ color: "red" }}>글 수정시 사진이 초기화되기에 반드시 재첨부해야합니다.</div>
          <div>사진을 첨부하세요. (.jpg, .jpeg, .png 형식만 가능, 1MB 용량제한) </div>
          <input name="image" type="file" accept="image/jpg, image/jpeg, image/png" placeholder="사진을 첨부하세요" />
          {/* <input name="image" type="file" accept="image/jpg, image/jpeg, image/png" placeholder="사진을 첨부하세요" defaultValue={result.image} /> //! 디폴트밸류 설정해놓으면 오류로 안됨 일단 제거 */}

          <input name="_id" style={{ display: "none" }} defaultValue={result._id.toString()} />
          {/* //!아이디를 함께 보내야하기 때문에 input으로 id 넣어놓고 display: none 처리 */}
          <button type="submit">수정완료</button>
        </form>
      </div>
    </div>
  );
}
