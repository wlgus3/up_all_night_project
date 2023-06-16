import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "f762b414d0281a5f27ac", //'Github에서 발급받은ID',
      clientSecret: "5b363d7f20bbcf213b8c2774eb863f3b23990b97", //'Github에서 발급받은Secret',
    }),
    //? Provider는 로그인 방식을 의미함 - 구글오어스 하려면 GoogleProvider를 아래로 추가하면됨
  ],
  secret: "pullhorizon", //'jwt생성시쓰는암호'
};
// export default NextAuth(authOptions);
export default (req, res) => NextAuth(req, res, authOptions);
