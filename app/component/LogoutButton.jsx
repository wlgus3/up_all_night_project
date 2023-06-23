"use client";

// import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
