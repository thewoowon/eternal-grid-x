import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          width: "224px",
          height: "224px",
          position: "relative",
        }}
      >
        <Image src={"/images/error/network-error.png"} alt="" priority fill />
      </div>
      <div
        style={{
          fontSize: "24px",
          color: "white",
          textDecoration: "none",
        }}
      >
        Not Found
      </div>
      <Link
        href="/"
        style={{
          marginTop: "16px",
          color: "white",
        }}
      >
        Go back to home
      </Link>
    </div>
  );
}
