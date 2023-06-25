"use client";

import { useEffect, useState } from "react";

// interface OwnProps {
//   parent: string;
// }

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
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
      <div>댓글리스트 </div>
      {data.length > 0 ? data.map((a, i) => <p key={i}>{a.content}</p>) : "댓글없음"}
      <div>
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
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
              .then(location.reload());
          }}
        >
          댓글전송
        </button>
      </div>
    </div>
  );
}
