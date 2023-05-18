import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb"; //! 이거 없으면 500에러

export default async function handler(req, res) {
  console.log(req.method);
  console.log(req.body);
  console.log(req.body._id);
  console.log(JSON.parse(req.body)._id);

  const client = await connectDB;
  const db = client.db("uppernight");

  if (req.method == "POST") {
    try {
      // let result = await db.collection("community").deleteOne({ _id: req.body });
      let result = await db.collection("community").deleteOne({ _id: new ObjectId(JSON.parse(req.body)._id) });

      console.log(result);
      res.status(200).json("삭제완료");
      // res.redirect(200, "/community");
    } catch (error) {
      // console.log(result);
      console.log(error);
      res.status(500).json("delete 서버오류");
    }
  }
}
