import Link from "next/link";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="footer">
      <nav></nav>
      <p>
        <span>Contact : pullhorizon@gmail.com</span>
        <br />
        <span>
          Copyright 2023. <span className="bold">Uppernight.</span> All Rights Reserved.
        </span>
        <div style={{ fontSize: "130%", right: "5vw", position: "absolute", marginTop: "2vw" }}>
          UpperNight <Image src={logoimg} alt="logo image" height="35" width="35" className="mobile_logo_image" />
          <Image src={logoimg} alt="logo image" height="50" width="50" className="web_logo_image" />
        </div>
      </p>
    </div>
  );
}
