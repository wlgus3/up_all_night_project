import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  let today = new Date(); //!날짜 보내기

  if (req.method == "PUT") {
    if (req.body.title == "") {
      return res.status(500).json("제목 미작성");
    } else if (req.body.content == "") {
      return res.status(500).json("내용 미작성");
    }
    try {
      let result = db.collection("community").insertOne({ ...req.body, score: 0, date: today });
      res.redirect(302, "/community");
    } catch (error) {
      res.status(500).json("서버오류");
    }
  }
}
