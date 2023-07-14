// const client = await MongoClient.("url", {
//     useNewUrlParser: true,
//   });
//   const db = client.db("uppernight");
//   db.collection("community").find;

// export(client)

//!  .ts 파일형식일 때
//!아래는 몽고디비 개발자들이 추천하는 세팅코드
import { MongoClient } from "mongodb";

//connect MongoDB
const url = process.env.MONGODB_URI;
//환경변수 설정 안하면 에러 발생
if (!url) {
  throw new Error("The MONGODB_URL environment variable is not defined");
}
const options: any = { useNewUrlParser: true };
var connectDB: Promise<MongoClient>;

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient> | undefined;
  } //!globalThis에 _mongo라는 속성 들어갈수 있다고 타입지정
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };

// //! .js 파일 형식일 때
// import { MongoClient } from "mongodb";
// const url = process.env.MONGODB_URI;
// const options = { useNewUrlParser: true };
// let connectDB;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongo) {
//     global._mongo = new MongoClient(url, options).connect();
//   }
//   connectDB = global._mongo;
// } else {
//   connectDB = new MongoClient(url, options).connect();
// }
// export { connectDB };
