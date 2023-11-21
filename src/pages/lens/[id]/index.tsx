"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export default function LensEmbed() {
  const router = useRouter();
  // const { toggleColorMode } = useColorMode();
  // console.log("theme is", router.query.theme);

  // useEffect(() => {
  //   if (router.query.theme == "dark") {
  //     toggleColorMode();
  //   }
  // }, []);

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
        src={`/embed?id=${router.query.id}&theme=${router.query.theme}`}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}
