import Link from "next/link";

import Image from "next/image";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Header() {
  // let session = getServerSession(authOptions);
  const session: any = await getServerSession(authOptions); //!서버 컴포넌트에서 세션정보 접근
  console.log(session);
  return (
    <div>
      <div>
        <span className="right" style={{ margin: "5px 6vw" }}>
          {session ? (
            <div>
              <span>
                <LogoutButton />{" "}
              </span>
              <span>{session.user.name} 님 반갑습니다 !</span>
            </div>
          ) : (
            <LoginButton></LoginButton>
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
