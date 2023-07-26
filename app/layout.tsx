import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import logoimg from "/public/KakaoTalk_Photo_2023-05-11-17-29-42 002.png";
import Header from "./component/header";
import Footer from "./component/Footer";
import Head from "next/head";

import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

//! next.js 13 부터 기본적으로 metadata가 아래와 같은 형식으로 포함되어있음
export const metadata: Metadata = {
  title: "UpperNightProject",
  description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 당신을 위한 커뮤니티",
  openGraph: {
    title: "UpperNightProject-OG",
    description: "밤샘몰입을 즐기며 빠른 성장을 추구하는 당신을 위한 커뮤니티-OG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_API_KEY%&libraries=services"></script> */}
      {/* <Head>
        <title>UpperNightProject</title>
        <meta name="description" content="밤샘몰입을 즐기며 빠른 성장을 추구하는 당신을 위한 커뮤니티" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head> */}
      <body className={inter.className}>
        <div className="wrap">
          <Header />
          <div className="page">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

// const Header = styled.div`
//   font-size: 30px;
// `; //! styled-component 사용 보류 -> 나중에 리팩토링으로 진행
