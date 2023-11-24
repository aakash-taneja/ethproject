"use client";
import MCard from "../../_ui/cards/MCard";
import FlexColumn from "../../_ui/flex/FlexColumn";
import useMeta from "@/hooks/meta/useMeta";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  const hookMeta = useMeta();
  console.log("metas from embed : ", hookMeta?.metaData?.meta);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      hookMeta._fetch(router.query.id);
    }
  }, [router.query.id]);

  const sample_images = [
    "https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2022/06/17/186446-l1.jpg?itok=JbCGzL61",
    "https://imgd.aeplcdn.com/600x600/n/cw/ec/48687/lamborghini-aventador-left-front-three-quarter0.jpeg?wm=0",
  ];

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
          // music={hookMeta?.metaData?.meta?.data?.modified?.meta_audio?.substr(
          //   5
          // )}
          // musicplayer={hookMeta?.metaData?.meta?.data?.modified?.meta_audio}
          title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
          // video={hookMeta?.metaData?.meta?.data?.modified?.meta_video}
          video="https://ipfs.io/ipfs/bafybeihbbkfthpouunrprad6s73dqykwlasd7eznk3vrlh6cft7pr3y3ae"
          // image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
          slug={hookMeta?.metaData?.meta?.slug}
          description={
            hookMeta?.metaData?.meta?.data?.modified?.meta_description
          }
          cardHeight="100vh"
          colorMode={router.query.theme}
          action_name="Collect"
          loading={hookMeta?.isLoading}
          // carousel_images={sample_images}
        />
      </Box>
    </FlexColumn>
  );
};

export default Index;
