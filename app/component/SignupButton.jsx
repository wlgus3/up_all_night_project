"use client";
import Link from "next/link";

export default function SignupButton() {
  return (
    <div>
      <Link href={"/register"}>
        <button>회원가입</button>
      </Link>
    </div>
  );
}
