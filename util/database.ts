// const client = await MongoClient.connect("url", {
//     useNewUrlParser: true,
//   });
//   const db = client.db("uppernight");
//   db.collection("community").find;

// export(client)

//!아래는 몽고디비 개발자들이 추천하는 세팅코드
import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI;
const options: any = { useNewUrlParser: true };
var connectDB: any;

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  } //!globalThis에 _mongo라는 속성 들어갈수 있다고 타입지정
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url as unknown as string, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url as unknown as string, options).connect();
}
export { connectDB };
