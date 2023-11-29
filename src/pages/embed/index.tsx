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
          // slug={hookGraph?.mData?.document?.slug}
          colorMode={router.query.theme}
          // loading={hookGraph?.isLoading}

          // music={hookGraph?.mData?.meta?.data?.modified?.meta_audio?.substr(
          //   5
          // )}
          // musicplayer={hookGraph?.mData?.meta?.data?.modified?.meta_audio}
          // video={hookGraph?.mData?.meta?.data?.modified?.meta_video}
          // video="https://ipfs.io/ipfs/bafybeihbbkfthpouunrprad6s73dqykwlasd7eznk3vrlh6cft7pr3y3ae"
          // image={hookGraph?.mData?.meta?.data?.modified?.meta_image}
          // carousel_images={sample_images}
        />
      </Box>
    </FlexColumn>
  );
};

export default Index;
