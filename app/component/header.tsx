import Link from "next/link";

import Image from "next/image";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <div>
      <div>
        <span className="right" style={{ margin: "5px 6vw" }}>
          <LoginButton />
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
