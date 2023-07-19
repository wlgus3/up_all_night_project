import Link from "next/link";

import Image from "next/image";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";

import UseSessionHeader from "./header/useSessionHeader";
export default function Header() {
  return (
    <div>
      <div>
        <UseSessionHeader />
      </div>

      <div className="header">
        <span style={{ margin: "3px" }}>
          <span>
            <Image className="mobile_logoimg" src={logoimg} alt="logo image" height="35" width="35" />
          </span>

          <span>
            <Image className="web_logoimg" src={logoimg} alt="logo image" height="50" width="50" />
          </span>
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
