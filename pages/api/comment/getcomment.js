import { connectDB } from "@/util/database.js";
import { ObjectID } from "bson";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const db = (await connectDB).db("uppernight");
  let result = await db
    .collection("comments")
    .find({ parent: new ObjectID(req.query.id) })
    .toArray();
  res.status(200).json(result);
}
