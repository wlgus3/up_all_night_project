// "use client";
import Link from "next/link";
import { useEffect } from "react";
export default function Content(props) {
  // let router = useRouter();
  let timeShortVer = String(props.element.date).split("GMT")[0];
  //Wed May 17 2023 17:21:37 GMT+0900 (대한민국 표준시) ->너무 길어서 GMT 이후로 버림

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
        <div>작성시간: {timeShortVer}</div>
        <div className="post_overflow">{props.element.content}</div>
        <div>추천: {props.element.score}</div>
      </div>
      <div className="post_image">{/* <Image alt="image" src={props.element.image} height="10" width="10"></Image> */}</div>
    </div>
  );
}
