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

  //! 아래는 result.content의 delta 형식을 html 형식으로 변환하기 위한 코드
  var html = undefined;
  if (props.element.content != undefined) {
    if (props.element.content[0] !== "{" || props.element.content == "") {
      //? 예전에 작성했던 글이 quill의 delta 형식이 아니기 때문에  에러나는 것 방지하기 위해서 분기
      html = undefined;
      console.log(1);
    } else {
      console.log(3);

      var QuillDeltaToHtmlConverter = require("quill-delta-to-html").QuillDeltaToHtmlConverter;
      var cfg = {};
      // console.log(JSON.parse(result.content));
      var converter = new QuillDeltaToHtmlConverter(JSON.parse(props.element.content).ops, cfg);
      html = converter.convert();
      html = removeHtmlTags(html);
    }
  }
  function removeHtmlTags(htmlString: string): string {
    let pureText = "";
    let insideTag = false;

    for (let i = 0; i < htmlString.length; i++) {
      const char = htmlString[i];

      if (char === "<") {
        // '<'를 만나면 태그가 시작된다는 표시로 insideTag를 true로 설정합니다.
        insideTag = true;
      } else if (char === ">") {
        // '>'를 만나면 태그가 끝났다는 표시로 insideTag를 false로 설정합니다.
        insideTag = false;
      } else if (!insideTag) {
        // 태그 내부가 아니라면 현재 문자를 순수한 텍스트로 추가합니다.
        pureText += char;
      }
    }

    return pureText;
  }

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
        <div className="post_overflow post_summary">
          {/* {props.element.content} */}
          {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : props.element.content}
        </div>
        {/* <div>추천: {props.element.score}</div> */}
      </div>
      {/* 이미지 추가기능 아직 개발전 */}
      <div className="post_image">{/* <Image alt="image" src={props.element.image} height="10" width="10"></Image> */}</div>
    </div>
  );
}
