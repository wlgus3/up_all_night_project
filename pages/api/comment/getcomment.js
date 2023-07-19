import { connectDB } from "@/util/database";
import { ObjectID } from "bson";

export default async function handler(req, res) {
  const db = (await connectDB).db("uppernight");
  let result = await db
    .collection("comments")
    .find({ parent: new ObjectID(req.query.id) })
    .toArray();
  res.status(200).json(result);
}
