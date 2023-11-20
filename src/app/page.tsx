"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import LensEmbed from "./lens/[id]/page";

export default async function Home() {
  return <></>;
}
