"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LensEmbed({ params }: { params: { id: any } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hookSearchParams = useSearchParams();

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
        src={`https://app.macha.ai/embed?id=${params.id}`}
        height={"80%"}
        width={"80%"}
      />
    </div>
  );
}
