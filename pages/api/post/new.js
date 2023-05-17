import { connectDB } from "@/util/database.js";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("uppernight");
  // const result = await db.collection("community").find().toArray();
  let today = new Date(); //!날짜 보내기

  if (req.method == "POST") {
    let result = db.collection("community").insertOne({ ...req.body, score: 0, date: today });
    res.redirect(302, "/community");
    console.log(req.body);
  }
}
