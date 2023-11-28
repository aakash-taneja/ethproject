import React from "react";
import FlexRow from "../flex/FlexRow";
import { Box, Image } from "@chakra-ui/react";
import TagNative from "../tag/TagNative";
import { slugToLogoMapping } from "@/data/meta";
import GlobalIcons from "@/styles/GlobalIcons";

type Props = {
  slug?: any;
  detailsModal?: any;
  walletModal?: any;
};

const Mheader = ({ slug, detailsModal, walletModal }: Props) => {
  return (
    <FlexRow
      hrAlign="space-between"
      paddingBottom="sm"
      paddingTop="sm"
      paddingLeft="sm"
      paddingRight="sm"
      // padding={style.card.padding.default}
      height="10%"
      vrAlign="center"
    >
      <Box
        onClick={() => {
          detailsModal.onOpen();
        }}
      >
        <TagNative
          icon={{
            align: "left",
            slug: `${slugToLogoMapping[slug] || "logo-Sound.xyz"}`,
          }}
          size="sm"
          value={slug}
          lineHeight="1.5rem"
        />
      </Box>
      <Image
        src={GlobalIcons["icon-wallet"]}
        onClick={() => {
          walletModal.onOpen();
        }}
      />
    </FlexRow>
  );
};

export default Mheader;
