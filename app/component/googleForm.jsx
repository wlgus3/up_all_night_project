import Link from "next/link";

export default function GoogleForm() {
  return (
    <span>
      <Link href="https://docs.google.com/forms/d/1zP2Htc42oUaUFCpqOXRgQ179mNYSEAuST4lvhjrxyP0/viewform?edit_requested=true">
        <button style={{ fontWeight: "650", padding: "5px 10px", fontSize: "105%" }}>정보등록요청 </button>
      </Link>
    </span>
  );
}
