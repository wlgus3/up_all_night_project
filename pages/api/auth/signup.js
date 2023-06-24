import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10); //bcrypt.hash 안에 패스워드 넣으면 암호화해줌. 10은 암호화정도인데 맘대로 수정가능
    req.body.password = hash;

    let db = (await connectDB).db("community");
    await db.collection("user_signup").insertOne(req.body); //유저정보를 object자료로 만들어서 user_cred 컬렉션에 넣으라고 했습니다.
    res.status(200).json("성공");
  }
}
