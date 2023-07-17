import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "../LogoutButton";
import SignupButton from "../SignupButton";
import LoginButton from "../LoginButton";

import { getServerSession } from "next-auth";

export default async function UseSessionHeader() {
  const session = await getServerSession(authOptions); //!서버 컴포넌트에서 세션정보 접근
  // console.log("session1", session);

  return (
    <span className="right" style={{ margin: "5px 6vw" }}>
      {session ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span>{session.user.name} 님 반갑습니다 .</span>
          <span>
            <LogoutButton />{" "}
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span>
            <LoginButton></LoginButton>
          </span>
          <span>
            <SignupButton></SignupButton>
          </span>
        </div>
      )}
    </span>
  );
}
