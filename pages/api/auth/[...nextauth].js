import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; //세션방식으로 구현하기 위해
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      //! env에 넣어서 process.env.XXX 형식으로 하려고 했으나 에러 계속 뜸
      clientId: "f762b414d0281a5f27ac", //'Github에서 발급받은ID',
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_GITHUB_PW, //'Github에서 발급받은Secret',
    }),

    CredentialsProvider({
      //! CredentialsProvider(), session(), callbacks() 모두 그냥 라이브러리 사용법
      //1. 라이브러리에서 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }, //어떤 인풋이 들어갈지 결정
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("uppernight");
        let user = await db.collection("user_signup").findOne({ email: credentials.email }); //유저 존재하는지 확인
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password); //pw 확인
        if (!pwcheck) {
          console.log("비밀번호틀림");
          return null;
        }
        return user;
      },
    }),
    //? Provider는 로그인 방식을 의미함 - 구글오어스 하려면 GoogleProvider를 아래로 추가하면됨
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, //jwt의 로그인 유지기간: 2일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user; //컴포넌트 안에서 보여줄 정보
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_OAUTH_SECRET, //'jwt생성시쓰는암호'

  adapter: MongoDBAdapter(connectDB), //?세션방식으로 구현하기 위해 몽고디비 어뎁터 추가
};
// export default NextAuth(authOptions); //! 이렇게 하면 TypeError: resolver is not a function 에러 뜸
export default (req, res) => NextAuth(req, res, authOptions); //req, res 같이 export하니까 오류 개선
