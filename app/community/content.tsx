// "use client";
import Link from "next/link";
import { useEffect } from "react";

interface contentDatas {
  element: {
    date: string;
    _id: string;
    title: string;
    content: string;
    score: number;
  };
}
export default function Content(props: any) {
  // let router = useRouter();

  //? Wed May 17 2023 17:21:37 GMT+0900 (대한민국 표준시) ->너무 길어서 GMT 이후로 생략
  let timeShortVer = String(props.element.date).split("GMT")[0];

  return (
    <div className="post">
      <div>
        <Link href={`community/detail/${props.element._id}`} prefetch={false}>
          <div className="post_overflow">{props.element.title}</div>
        </Link>

        {/* <div
          onClick={() => {
            router.push("/");
          }}
        >
          {props.element.title}
        </div> */}
        <div>✍🏻 {timeShortVer}</div>
        <div className="post_overflow">{props.element.content}</div>
        <div>추천: {props.element.score}</div>
      </div>
      {/* 이미지 추가기능 아직 개발전 */}
      <div className="post_image">{/* <Image alt="image" src={props.element.image} height="10" width="10"></Image> */}</div>
    </div>
  );
}
