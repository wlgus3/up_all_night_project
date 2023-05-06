// const client = await MongoClient.connect("url", {
//     useNewUrlParser: true,
//   });
//   const db = client.db("uppernight");
//   db.collection("community").find;

// export(client)

//!아래는 몽고디비 개발자들이 추천하는 세팅코드
import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI;
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
