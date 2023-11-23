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

  return (
    <FlexColumn height="100vh" vrAlign="center" hrAlign="center">
      <Box
        height={"100vh"}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        background={
          router.query.theme == "light" ? "rgba(255,255,255,1)" : "#030c1a"
        }
      >
        <MCard
          // music={hookMeta?.metaData?.meta?.data?.modified?.meta_audio?.substr(5)}
          musicplayer={hookMeta?.metaData?.meta?.data?.modified?.meta_audio}
          title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
          image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
          slug={hookMeta?.metaData?.meta?.slug}
          description={
            hookMeta?.metaData?.meta?.data?.modified?.meta_description
          }
          cardHeight="100vh"
          colorMode={router.query.theme}
          // action_name="Collect"
          loading={hookMeta?.isLoading}
        />
      </Box>
    </FlexColumn>
  );
};

export default Index;
