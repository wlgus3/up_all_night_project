import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database.js";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; //세션방식으로 구현하기 위해

export const authOptions = {
  providers: [
    GithubProvider({
      //! env에 넣어서 process.env.XXX 형식으로 하려고 했으나 에러 계속 뜸
      clientId: "f762b414d0281a5f27ac", //'Github에서 발급받은ID',
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_GITHUB_PW, //'Github에서 발급받은Secret',
    }),
    //? Provider는 로그인 방식을 의미함 - 구글오어스 하려면 GoogleProvider를 아래로 추가하면됨
  ],

  secret: process.env.NEXT_PUBLIC_OAUTH_SECRET, //'jwt생성시쓰는암호'

  adapter: MongoDBAdapter(connectDB), //?세션방식으로 구현하기 위해 몽고디비 어뎁터 추가
};
// export default NextAuth(authOptions); //! 이렇게 하면 TypeError: resolver is not a function 에러 뜸
export default (req, res) => NextAuth(req, res, authOptions); //req, res 같이 export하니까 오류 개선
