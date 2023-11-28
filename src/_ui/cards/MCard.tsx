import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import MusicPlayer from "@/components/MusicPlayer";
import { slugToLogoMapping } from "@/data/meta";
import { helperIPFS, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style as gStyle, style } from "@/styles/StyledConstants";
import { ConnectWallet, metamaskWallet, useConnect } from "@thirdweb-dev/react";
import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Loader1 from "../loader/Loader1";
import ModalSlider from "../modal/ModalSlider";
import Carousel from "./Carousel";
import ReactPlayer from "react-player";

type Props = {
  title?: string;
  image?: string;
  video?: string;
  floorPrice?: string;
  description?: string;
  owner_name?: string;
  owner_image?: string;
  owner_heading?: string;
  action_name?: string;
  action_type?: string;
  action_value?: string;
  width?: string;
  onClick?: any;
  slug?: any;
  cardHeight?: any;
  music?: any;
  titleMaxw?: any;
  musicplayer?: any;
  shadowOnHover?: any;
  showMore?: boolean;
  colorMode?: any;
  loading?: any;
  carousel_images?: any;
  media?: any;
  audioURL: string;
  audioCover: string;
};

const MCard = ({
  image,
  video,
  title,
  media,
  floorPrice,
  description,
  owner_name,
  owner_heading,
  owner_image,
  action_name,
  action_type,
  action_value,
  width,
  onClick,
  slug,
  cardHeight,
  titleMaxw,
  music,
  musicplayer,
  shadowOnHover = true,
  showMore,
  colorMode,
  loading,
  carousel_images,
  audioURL,
  audioCover,
}: Props) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const detailsModal = useDisclosure();
  const walletModal = useDisclosure();
  const connect = useConnect();
  const metamaskConfig = metamaskWallet();

  const playAudio = (e: any) => {
    setIsPlaying(true);
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const stopAudio = (e: any) => {
    setIsPlaying(false);
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  const handleAudioEnded = () => {
    setIsPlaying(false); // Update isPlaying to false when audio ends
  };

  // console.log("theme is ", router.asPath);
  // if (router.query.theme == "dark") {
  //   toggleColorMode();
  // }

  // const address = useAddress();
  // const setIsWalletModalOpen = useSetIsWalletModalOpen();

  // const openModal = () => {
  //   !address && setIsWalletModalOpen(true);
  // };

  // console.log(
  //   "color mode is ",
  //   colorMode,
  //   "type of colorMode",
  //   typeof colorMode
  // );
  // console.log("here is the wallet address:", address);
  return (
    <>
      <Box
        height={"100%"}
        width={"100%"}
        borderRadius={"15px"}
        background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        // marginRight={style.margin["sm"]}
        // marginLeft={style.margin["sm"]}
        // marginBottom={style.margin["lg"]}
        overflow={"hidden"}
        border={
          colorMode == "light"
            ? "1px solid #e2e2e2"
            : gStyle.card.border.default
        }
        // onClick={onClick}
        // cursor={shadowOnHover && "pointer"}
        // flexWrap={"wrap"}
        style={{
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "all",
          transitionDuration: "600ms",
        }}
        // _hover={{
        //   border: `${shadowOnHover && gStyle.card.border.meta}`,
        //   boxShadow: `${shadowOnHover && "-0.15px 0.15px 28px 0px #004AD9"}`,
        // }}
      >
        {loading ? (
          <Loader1 />
        ) : (
          <>
            <Box
              height={"90%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"flex-start"}
              width={"100%"}
              borderRadius={"1.4rem"}
            >
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

              {owner_name && (
                <FlexRow
                  height="fit-content"
                  hrAlign="center"
                  marginBottom={"xs"}
                >
                  <FlexColumn vrAlign="flex-start" marginLeft={"xxs"}>
                    <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
                      {owner_name}
                    </Text>
                    <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
                      {owner_heading}
                    </Text>
                  </FlexColumn>
                </FlexRow>
              )}
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
                      background: `${
                        colorMode == "light" ? "#efefef" : "#000A24"
                      }`,
                      width: "100%",
                    }}
                  >
                    <Image
                      src={audioCover}
                      alt="coverImage"
                      height="100%"
                      objectFit={"cover"}
                      borderRadius={gStyle.card.borderRadius.default}
                    />
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
                      background: `${
                        colorMode == "light" ? "#efefef" : "#000A24"
                      }`,
                      width: "100%",
                    }}
                  >
                    <Image
                      src={helperIPFS(media?.asset?.image?.raw?.uri)}
                      alt="coverImage"
                      height="100%"
                      objectFit={"cover"}
                      borderRadius={gStyle.card.borderRadius.default}
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
                hrAlign={
                  media?.type == "TextOnlyMetadataV3" ? "center" : "flex-start"
                }
                padding={style.card.padding.default}
                width="100%"
              >
                {media?.type == "AudioMetadataV3" && (
                  <MusicPlayer
                    key={musicplayer}
                    audioUrl={audioURL}
                    colorMode={colorMode}
                  />
                )}
                {title && (
                  <Text
                    color={colorMode == "light" ? "#282828" : ""}
                    className="m-b-0"
                    fontSize={"xl"}
                    fontWeight={600}
                    marginTop={gStyle.margin["xs"]}
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
                      maxW={titleMaxw ? titleMaxw : "90vw"}
                      fontSize={style.font.h1}
                      sx={{
                        "@media screen and (max-width: 480px)": {
                          fontSize: `${style.font.h3}`,
                        },
                      }}
                      marginTop={gStyle.margin["xxxs"]}
                    >
                      {image
                        ? viewMore
                          ? description
                          : truncateString(description, 110)
                        : viewMore
                        ? description
                        : truncateString(description, 500)}

                      {description?.length > 110 && showMore && (
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
                      )}
                    </Text>
                  </>
                )}
              </FlexColumn>
            </Box>
            <Box
              paddingY={style.padding.xxs}
              paddingX={style.card.padding.default}
              borderTop={
                colorMode == "light"
                  ? "1px solid #e2e2e2"
                  : gStyle.card.border.default
              }
              marginTop={style.margin.md}
              height={"10%"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                marginRight={style.margin.xs}
                color={colorMode == "light" ? "#000" : "#fff"}
              >
                Powered By
              </Text>
              <Image
                src={
                  colorMode == "light"
                    ? GlobalIcons["logo-dark-Macha"]
                    : "/assets/MACHALogo.svg"
                }
                alt="logo"
                width={106}
                height={39}
              />
            </Box>
          </>
        )}
      </Box>
      <ModalSlider
        event={detailsModal}
        colorMode={colorMode}
        header={
          <FlexRow>
            <Button
              size="sm"
              onClick={detailsModal.onClose}
              variant="state_default_hover"
            >
              Cancel
            </Button>
          </FlexRow>
        }
      >
        <FlexColumn height="300px">
          <Text color={colorMode == "light" ? "#000" : "#fff"}>
            Hello macha
          </Text>
        </FlexColumn>
      </ModalSlider>
      <ModalSlider
        event={walletModal}
        colorMode={colorMode}
        header={
          <FlexRow>
            <Image
              src={GlobalIcons["icon-chevron-down"]}
              onClick={walletModal.onClose}
            />
          </FlexRow>
        }
      >
        <FlexColumn height="300px" hrAlign="flex-start">
          <ConnectWallet
            style={{
              marginBottom: `${style.margin.md}`,
              width: "100%",
              background: `${style.button.bg.active}`,
              color: "white",
            }}
            theme={colorMode == "light" ? "light" : "dark"}
            modalSize="compact"
          />
        </FlexColumn>
      </ModalSlider>
    </>
  );
};

export default MCard;
