import Link from "next/link";

export default function GoogleForm() {
  return (
    <span>
      <Link href="https://docs.google.com/forms/d/1zP2Htc42oUaUFCpqOXRgQ179mNYSEAuST4lvhjrxyP0/viewform?edit_requested=true">
        <button style={{ fontWeight: "650", right: "5vw", position: "absolute", padding: "10px 15px" }}>정보등록요청 </button>
      </Link>
    </span>
  );
}
