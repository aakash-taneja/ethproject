"use client";
import { useRouter } from "next/router";

import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import FlexColumn from "@/_ui/flex/FlexColumn";
import MCard from "@/_ui/cards/MCard";

export default function LensEmbed() {
  const router = useRouter();
  // const { toggleColorMode } = useColorMode();
  // console.log("theme is", router.query.theme);

  // useEffect(() => {
  //   if (router.query.theme == "dark") {
  //     toggleColorMode();
  //   }
  // }, []);

  console.log("mode ", router.query.mode);

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
      <Box
        height={"95%"}
        width={"50%"}
        sx={{
          "@media screen and (max-width: 950px)": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        {/* <iframe
          src={`/embed?id=${router.query.id}&theme=${router.query.theme}&type=${router.query.type}&mode=${router.query.mode}`}
          height={"100%"}
          width={"100%"}
          style={{ borderRadius: "0px" }}
        /> */}
        <FlexColumn
          height="100vh"
          vrAlign="center"
          hrAlign="center"
          width="100%"
        >
          <Box
            height={"100%"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            background={
              router.query.theme == "light" ? "rgba(255,255,255,1)" : "#030c1a"
            }
          >
            <MCard
              width={"100%"}
              left="0px!important"
              colorMode={router.query.theme}
            />
          </Box>
        </FlexColumn>
      </Box>
    </div>
  );
}
