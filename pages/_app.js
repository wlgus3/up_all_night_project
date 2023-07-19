import "../app/globals.css";

// import the Head component for appending elements to the head of the page
import Head from "next/head";
import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add the favicon */}
      {/* 메타데이터 변경 */}
      {/* <Head>
        <title>UpperNightProject</title> // 작동안함-> /app/layout.tsx
        <meta name="description" content="밤샘몰입을 즐기며 빠른 성장을 추구하는 당신을 위한 커뮤니티" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head> */}
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
