import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb"; //! 이거 없으면 500에러
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();

  let session = await getServerSession(req, res, authOptions);

  let find = await db.collection("community").findOne({ _id: new ObjectId(req.body._id) });
  //! PUT으로 하면 'this may result in stalled requests.'에러 뜸
  if (!session) {
    return res.status(400).json("로그인 전에는 글 편집이 불가능합니다.");
  }
  if (req.method == "POST") {
    if (req.body.title == "") {
      return res.status(500).json("제목 미작성");
    } else if (req.body.content == "") {
      return res.status(500).json("내용 미작성");
    }
    if (find.email == session.user.email) {
      try {
        let changedData = { title: req.body.title, content: req.body.content, image: req.body.image };
        console.log(changedData);
        let result = await db.collection("community").updateOne({ _id: new ObjectId(req.body._id) }, { $set: changedData });
        //db.collection(컬렉션명).updateOne({수정할게시물정보}, { $set : {수정할내용} } );
        // let result = db.collection("community").updateOne({ ...req.body, score: 0, date: today });
        console.log(result);

        res.redirect(302, "/community/1");
      } catch (error) {
        res.status(500).json("edit 서버오류");
      }
    } else {
      return res.status(500).json("작성자와 현재 사용자 불일치");
    }
  }
}
