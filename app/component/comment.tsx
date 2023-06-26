"use client";

import { useState } from "react";

// interface OwnProps {
//   parent: string;
// }

export default function Comment(props) {
  let [comment, setComment] = useState("");
  return (
    //form 태그 쓰면 새로고침되기에 안씀a
    <div>
      <h3>댓글</h3>
      <div>댓글리스트 </div>
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

            fetch("/api/comment/post", { method: "POST", body: JSON.stringify({ content: comment, parent: props.parent }) });
          }}
        >
          댓글전송
        </button>
      </div>
    </div>
  );
}
