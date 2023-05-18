"use client";

import { redirect } from "next/dist/server/api-utils";

export default function DeleteButton(props) {
  console.log(props);
  return (
    <div>
      <button
        onClick={() => {
          fetch("/api/post/delete", { method: "POST", body: JSON.stringify(props) }).then(() => {
            location.href = "/community";
          });
        }}
        style={{ color: "red", fontSize: "small", marginTop: "4vh" }}
      >
        삭제하기 🗑️
      </button>
    </div>
  );
}
