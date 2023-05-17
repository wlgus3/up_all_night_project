import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
  //! DB 전체 get
  const client = await connectDB;
  const db = client.db("uppernight");
  const result = await db.collection("community").find().toArray();
  let today = new Date(); //!날짜 보내기

  if (req.method == "GET") {
    res.status(200).json(`처리완료 ${today}, ${result}`);
  }
  // res.status(200).json("처리완료함");
}
