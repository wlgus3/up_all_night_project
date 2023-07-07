import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb"; //! 이거 없으면 500에러

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");

  if (req.method == "GET") {
    //! delete명령어로 했을 때에 오류나서 일단 post로 구현
    console.log(req.query);
    try {
      // let result = await db.collection("community").deleteOne({ _id: req.body });
      let result = await db.collection("community").deleteOne({ _id: new ObjectId(req.query) });

      console.log(result); //삭제 잘됐는지 확인
      res.status(200).json("삭제완료");
      // res.redirect(200, "/community");
    } catch (error) {
      // console.log(result);
      console.log(error);
      res.status(500).json("delete 서버오류");
    }
  }
}
