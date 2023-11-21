"use client";
import MCard from "../../_ui/cards/MCard";
import FlexColumn from "../../_ui/flex/FlexColumn";
import useMeta from "@/hooks/meta/useMeta";
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
      <MCard
        // music={hookMeta?.metaData?.meta?.data?.modified?.meta_audio?.substr(5)}
        musicplayer={hookMeta?.metaData?.meta?.data?.modified?.meta_audio}
        title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
        image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
        slug={hookMeta?.metaData?.meta?.slug}
        description={hookMeta?.metaData?.meta?.data?.modified?.meta_description}
        cardHeight="100vh"
        colorMode={router.query.theme}
      />
    </FlexColumn>
  );
};

export default Index;
