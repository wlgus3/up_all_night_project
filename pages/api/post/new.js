import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  let today = new Date(); //!날짜 보내기
  let session = await getServerSession(req, res, authOptions); //서버기능 안에서 갖다쓸 때에는 req, res도 함께 가져다 써야함

  console.log(req.body);
  console.log(JSON.parse(req.body).content);
  console.log(JSON.parse(req.body).content.ops);

  // console.log(req.body);
  // req.body.author = session.user.name;
  // req.body.email = session.user.email;
  // console.log(req.body);

  if (!session) {
    return res.status(400).json("로그인 전에는 글 게시가 불가능합니다.");
  }
  if (req.method == "POST") {
    if (JSON.parse(req.body).title == "") {
      return res.status(500).json("제목(title) 미작성");
    }
    //  else if (JSON.parse(req.body).content.ops == '[ { insert: "\n" } ]') {
    //   return res.status(500).json("내용(content) 미작성");
    // }
    try {
      let result = db.collection("community").insertOne({
        title: String(JSON.parse(req.body).title),
        content: JSON.stringify(JSON.parse(req.body).content),
        score: 0,
        date: today,
        author: session.user.name,
        email: session.user.email,
        profileurl: session.user.image,
      }); //추천수와 날짜 추가해서 전송
      res.status(302).json("글 게시 완료").redirect("/naver.com");
    } catch (error) {
      res.status(500).json("서버오류");
    }
  }
}
