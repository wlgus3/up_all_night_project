"use client";

import { redirect } from "next/dist/server/api-utils";

interface deleteBtnProps {
  _id: string;
}

export default function DeleteButton(props: deleteBtnProps) {
  // console.log(props);
  // console.log(props._id);
  return (
    <div>
      <button
        onClick={() => {
          //단순 스트링이나 숫자가 아닌 객체형식 데이터보낼때 JSON.stringify()안에 담아서 보내면 잘 감
          //! 방법1) 그냥 delete로 보내기
          fetch("/api/post/delete", { method: "POST", body: JSON.stringify(props) })
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
            .then(() => {
              location.href = "/community/1";
            })
            .catch((error) => {
              //인터넷문제 등으로 실패시 실행할코드
              console.log(error);
            });

          //! 방법2) URL parameter로 구현
          // fetch(`/api/post/delete/${props._id}`, { method: "GET" }) //props 자체가 {_id:xxx..}형태이기에
          //   .then((res) => {
          //     if (res.status == 200) {
          //       return res.json(); //! 서버로부터 res로 받은 문구를 직접 alert에 띄우기 위한 코드
          //     } else {
          //       //서버가 500, 400등 에러코드전송시 실행할코드
          //     }
          //   })
          //   .then((res) => {
          //     alert(res);
          //   })
          //   .then(() => {
          //     location.href = "/community";
          //   })
          //   .catch((error) => {
          //     //인터넷문제 등으로 실패시 실행할코드
          //     console.log(error);
          //   });
        }}
        style={{ color: "red", fontSize: "small", marginTop: "4vh" }}
      >
        삭제하기 🗑️
      </button>
    </div>
  );
}
