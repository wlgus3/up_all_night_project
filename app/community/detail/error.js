"use client"; //? 에러페이지는 반드시 클라이언트

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>ERROR </h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시시도
      </button>
    </div>
  );
}
