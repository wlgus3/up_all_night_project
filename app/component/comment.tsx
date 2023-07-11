"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// interface OwnProps {
//   parent: string;
// }

interface commentProps {
  parent: string;
}

export default function Comment(props: commentProps) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  const router = useRouter();
  console.log(props.parent);
  useEffect(() => {
    //? 댓글내용 가져오기 코드
    fetch("/api/comment/getcomment?id=" + props.parent) //글 정보 쿼리스트링 문법으로 보냄
      .then((r) => r.json())
      .then((result) => {
        setData(result); //가져온 데이터를 state에 저장
      });
  }, []);
  return (
    //form 태그 쓰면 새로고침되기에 안씀a
    <div>
      <h3>댓글</h3>

      {data.length > 0
        ? data.map(
            (
              el: {
                content: string;
                author: string;
              },
              idx
            ) => (
              <p key={idx}>
                {el.content} ...from: {el.author}
              </p>
            )
          )
        : "댓글없음"}
      <div>
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="textarea"
          maxLength={200}
          placeholder="댓글을 입력하세요 (최대 200자)"
          style={{ width: "80%" }}
        ></input>

        <button
          onClick={() => {
            console.log(comment);
            console.log(props.parent);

            fetch("/api/comment/post", { method: "POST", body: JSON.stringify({ content: comment, parent: props.parent }) })
              .then((res) => {
                if (res.status == 200) {
                  return res.json(); //? 서버로부터 res로 받은 문구를 직접 alert에 띄우기 위한 코드
                } else {
                  return res.json();
                  //서버가 500, 400등 에러코드전송시 실행할코드
                }
              })
              .then((res) => {
                alert(res);
              })
              .then(() => router.replace("/community"));
            //! 원래는 reload()를 하면서 코멘트 달린 게 바로 보여야 하는데, 아직 이유는 모르겠으나 안됨... 일단 /community 페이지로 나가도록 구현
            // .then(() => router.replace("/community/detail/" + props.parent));
            // .then(() => router.reload());
          }}
        >
          댓글전송
        </button>
      </div>
    </div>
  );
}
