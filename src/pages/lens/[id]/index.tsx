"use client";
import { useRouter } from "next/router";

export default function LensEmbed() {
  const router = useRouter();

  // console.log("params ", );

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        src={`/embed?id=${router.query.id}`}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}
