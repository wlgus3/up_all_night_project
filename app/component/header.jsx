import Link from "next/link";

import Image from "next/image";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Session } from "../type";

export default async function Header() {
  // let session = getServerSession(authOptions);

  const session = await getServerSession(authOptions); //!서버 컴포넌트에서 세션정보 접근 ->authOptions type에러가 나는데 next-auth 임포트해서 메뉴얼대로 export했기때문에 너무 복잡, 나중에 TS 파일로 수정
  console.log(session);
  return (
    <div>
      <div>
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
      </div>

      <div className="header">
        <span style={{ margin: "3px" }}>
          <Image src={logoimg} alt="logo image" height="35" width="35" className="mobile_logo_image" />
          <Image src={logoimg} alt="logo image" height="50" width="50" className="web_logo_image" />
        </span>
        <Link href={"/"}> Upper Night </Link>
      </div>

      <div className="top_nav">
        <Link href={"/24cafe"}> 24H cafe </Link>
        <Link href={"/community"}>Community</Link>
      </div>
    </div>
  );
}
