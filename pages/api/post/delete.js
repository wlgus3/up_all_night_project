import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb"; //! 이거 없으면 500에러

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { isConstructorDeclaration } from "typescript";

//! 일반적인 delete 구현 . api/post/delete/[id] 와 같이  URL parameter사용한 방법도 있음
export default async function handler(req, res) {
  // console.log(req.method);
  // console.log(req.body);

  console.log(JSON.parse(req.body)._id);

  const client = await connectDB;
  const db = await client.db("uppernight");
  let session = await getServerSession(req, res, authOptions);
  let find = await db.collection("community").findOne({ _id: new ObjectId(JSON.parse(req.body)._id) });
  if (req.method == "POST" && find.email == session.user.email) {
    let result = await db.collection("community").deleteOne({ _id: new ObjectId(JSON.parse(req.body)._id) });
    console.log(result); //삭제 잘됐는지 확인
    res.status(200).json("삭제완료");
  } else {
    return res.status(500).json("delete 서버오류 혹은 작성자와 현재 사용자 불일치");
  }
  // if (req.method == "POST") {
  //   //! delete명령어로 했을 때에 오류나서 일단 post로 구현
  //   try {
  //     // let result = await db.collection("community").deleteOne({ _id: req.body });
  //     let result = await db.collection("community").deleteOne({ _id: new ObjectId(JSON.parse(req.body)._id) });

  //     console.log(result); //삭제 잘됐는지 확인
  //     res.status(200).json("삭제완료");
  //     // res.redirect(200, "/community");
  //   } catch (error) {
  //     // console.log(result);
  //     console.log(error);
  //     res.status(500).json("delete 서버오류");
  //   }
  // }
}
