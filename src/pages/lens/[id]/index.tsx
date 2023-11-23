"use client";
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
        background: `${
          router.query.theme == "light" ? "rgba(255,255,255,1)" : "#030c1a"
        }`,
      }}
    >
      <iframe
        src={`/embed?id=${router.query.id}&theme=${router.query.theme}`}
        height={"95%"}
        width={"50%"}
        style={{ borderRadius: "0px" }}
      />
    </div>
  );
}
