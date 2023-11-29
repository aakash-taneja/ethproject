"use client";
import MCard from "../../_ui/cards/MCard";
import FlexColumn from "../../_ui/flex/FlexColumn";
import useGraph from "@/hooks/useGraph";
import { Box } from "@chakra-ui/react";
import { AbiCoder } from "ethers/lib/utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

const Index = () => {
  const router = useRouter();

  return (
    <FlexColumn height="100vh" vrAlign="center" hrAlign="center" width="100%">
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
  );
};

export default Index;
