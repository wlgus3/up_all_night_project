import { connectDB } from "@/util/database";
import { ObjectID } from "bson";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  let today = new Date(); //!날짜 보내기
  let session = await getServerSession(req, res, authOptions); //서버기능 안에서 갖다쓸 때에는 req, res도 함께 가져다 써야함
  console.log(session);

  console.log(req.body);
  console.log(JSON.parse(req.body).parent);
  req.body = JSON.parse(req.body);
  let data = { content: req.body.content, parent: new ObjectID(req.body.parent), date: today, author: session.user.email };
  if (req.method == "POST") {
    if (req.body == "") {
      return res.status(500).json("댓글 미작성");
    }
    if (req.body.length > 200) {
      return res.status(500).json("댓글의 길이가 너무 깁니다.(최대 200자)");
    }
    if (session == "") {
      return res.status(500).json("로그인 후 이용가능");
    }
    try {
      let result = db.collection("comments").insertOne(data); //댓글작성자, 날짜 추가해서 포스팅
      res.status(200).json("댓글작성 완료");
    } catch (error) {
      res.status(500).json("서버오류");
    }
  }
}
