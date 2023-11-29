import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FlexRow from "../flex/FlexRow";
import TagNative from "../tag/TagNative";
import { slugToLogoMapping } from "@/data/meta";
import GlobalIcons from "@/styles/GlobalIcons";
import FlexColumn from "../flex/FlexColumn";
import { helperIPFS, truncateString } from "@/helpers";
import useGraph from "@/hooks/useGraph";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import MusicPlayer from "@/components/MusicPlayer";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import ButtonNative from "../buttons/ButtonNative";
import { AbiCoder } from "ethers/lib/utils";
import { ethers } from "ethers";
import lenshubAbi from "../../data/lenshubAbi.json";
import { graphQuery } from "@/service/MetaService";

type Props = {
  metaId: string;
  metaType: string;
  // hookGraph?: any;
};

const Mcontent = ({ metaId, metaType }: Props) => {
  const [contract, setContract] = useState<any>();
  const [args, setArgs] = useState<any>();
  const [viewMore, setViewMore] = useState<boolean>(false);

  const detailsModal = useDisclosure();
  const walletModal = useDisclosure();
  const router = useRouter();
  const address = useAddress();
  const abiCoder = new AbiCoder();
  const hookGraph = useGraph();

  const colorMode = router.query.theme;

  const modified = hookGraph?.mData?.document?.modified;
  const title = modified?.title;
  const description = modified?.desc;
  const media = modified?.media;

  useEffect(() => {
    // console.log("posaph", hookGraph);
    const fetchData = async () => {
      if (router.isReady) {
        if (metaId) {
          if (address) {
            const actorProfileId = await getActorProfileId(address);
            const id = metaId.toString().split("-");
            const profileId = parseInt(id[0]);
            const publicationId = parseInt(id[1]);
            let actionModuleData = abiCoder.encode(["address"], [address]);
            actionModuleData =
              actionModuleData +
              "0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            setArgs([
              profileId,
              publicationId,
              actorProfileId,
              [],
              [],
              "0x0D90C58cBe787CD70B5Effe94Ce58185D72143fB",
              actionModuleData,
            ]);
            console.log("args", [
              profileId,
              publicationId,
              actorProfileId,
              [],
              [],
              "0x0D90C58cBe787CD70B5Effe94Ce58185D72143fB",
              actionModuleData,
            ]);
          }
          if (typeof window !== "undefined" && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(
              window?.ethereum as ethers.providers.ExternalProvider
            );
            const signer = provider.getSigner();
            setContract(
              new ethers.Contract(
                "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d",
                lenshubAbi,
                signer
              )
            );
          }
          await hookGraph._fetch(metaId, metaType);

          // console.log("window.ethereum defined", contract);
        }
      }
    };
    fetchData();
  }, [metaId, address, metaType]);

  const getActorProfileId = async (address: any) => {
    const data = {
      data: address,
    };
    const res = await graphQuery("lens_id", data);
    return parseInt(res?.modified?.lensId);
  };

  return (
    <Box
      height={"80%"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      borderRadius={"1.4rem"}
    >
      {/* {owner_name && (
        <FlexRow height="fit-content" hrAlign="center" marginBottom={"xs"}>
          <FlexColumn vrAlign="flex-start" marginLeft={"xxs"}>
            <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
              {owner_name}
            </Text>
            <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
              {owner_heading}
            </Text>
          </FlexColumn>
        </FlexRow>
      )} */}
      {media?.type == "VideoMetadataV3" ? (
        <FlexColumn height="60%" vrAlign="center" hrAlign="flex-start">
          <div
            style={{
              height: "100%",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginBottom: `${style.margin.sm}`,
            }}
          >
            <video
              src={helperIPFS(media?.asset?.video?.raw?.uri)}
              preload="auto"
              controls={true}
              style={{ width: "100%", height: "100%" }}
            ></video>
          </div>
        </FlexColumn>
      ) : media?.type == "AudioMetadataV3" ? (
        <>
          <div
            style={{
              height: "60%",
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              background: `${colorMode == "light" ? "#efefef" : "#000A24"}`,
              width: "100%",
            }}
          >
            {/* <Image
              src={audioCover}
              alt="coverImage"
              height="100%"
              objectFit={"cover"}
              borderRadius={style.card.borderRadius.default}
            /> */}
          </div>
        </>
      ) : media?.type == "TextOnlyMetadataV3" ? (
        <></>
      ) : (
        <FlexColumn height="60%" vrAlign="flex-start">
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              background: `${colorMode == "light" ? "#efefef" : "#000A24"}`,
              width: "100%",
            }}
          >
            <Image
              src={helperIPFS(media?.asset?.image?.raw?.uri)}
              alt="coverImage"
              height="100%"
              objectFit={"cover"}
              borderRadius={style.card.borderRadius.default}
            />
          </div>
        </FlexColumn>
      )}
      {/* {carousel_images && (
                <Carousel colorMode={colorMode} images={carousel_images} />
              )} */}

      <FlexColumn
        height={media?.type == "TextOnlyMetadataV3" ? "100%" : "30%"}
        vrAlign="flex-start"
        hrAlign={media?.type == "TextOnlyMetadataV3" ? "center" : "flex-start"}
        padding={style.card.padding.default}
        width="100%"
      >
        {media?.type == "AudioMetadataV3" && (
          <></>
          // <MusicPlayer
          //   key={musicplayer}
          //   audioUrl={audioURL}
          //   // colorMode={colorMode}
          // />
        )}
        {title && (
          <Text
            color={colorMode == "light" ? "#282828" : ""}
            className="m-b-0"
            fontSize={"xl"}
            fontWeight={600}
            marginTop={style.margin["xs"]}
            maxW="90vw"
          >
            {title}
          </Text>
        )}
        {description && (
          <>
            <Text
              color={colorMode == "light" ? "#282828" : ""}
              className="m-b-0"
              maxW={"90vw"}
              fontSize={style.font.h1}
              sx={{
                "@media screen and (max-width: 480px)": {
                  fontSize: `${style.font.h3}`,
                },
              }}
              marginTop={style.margin["xxxs"]}
            >
              {viewMore ? description : truncateString(description, 110)}

              {/* {description?.length > 110 && (
                // <span>
                <Text
                  color="blue"
                  _hover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setViewMore((prevState) => !prevState)}
                >
                  {viewMore ? "View Less" : "View More"}
                </Text>
                // </span>
              )} */}
            </Text>
          </>
        )}
      </FlexColumn>
      <FlexColumn>
        {address ? (
          <ButtonNative
            variant="state_default_hover"
            height="5rem"
            width="95%"
            text="Claim"
            onClick={async () => {
              if (contract) {
                await contract.act(args);
              } else {
                console.log("contract undefined", contract);
              }
            }}
          />
        ) : (
          <Web3Button
            style={{
              width: "95%",
              height: "5rem",
            }}
            contractAddress=""
            action={() => {}}
          />
        )}
      </FlexColumn>
    </Box>
  );
};

export default Mcontent;
