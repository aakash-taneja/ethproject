import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import MusicPlayer from "@/components/MusicPlayer";
import { helperIPFS, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import { slugToLogoMapping } from "@/data/meta";
import ModalSlider from "../modal/ModalSlider";
import {
  ConnectWallet,
  useAddress,
  useSetIsWalletModalOpen,
} from "@thirdweb-dev/react";
import useMeta from "@/hooks/meta/useMeta";
import Loader1 from "../loader/Loader1";

type Props = {
  title?: string;
  image?: string;
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
};

const MCard = ({
  image,
  title,
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
}: Props) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const embedSliderModal = useDisclosure();

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

  console.log(
    "color mode is ",
    colorMode,
    "type of colorMode",
    typeof colorMode
  );
  // console.log("here is the wallet address:", address);
  return (
    <>
      {loading ? (
        <>
          {/* <Heading>Loading...</Heading> */}
          <Loader1/>
        </>
      ) : (
        <>
          <Box
            height={"100vh"}
            borderRadius={"5px"}
            background={
              colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"
            }
            // marginRight={style.margin["sm"]}
            // marginLeft={style.margin["sm"]}
            // marginBottom={style.margin["lg"]}
            overflow={"hidden"}
            width={"100%"}
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
            <Box
              padding={style.card.padding.default}
              height={"90%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <FlexRow
                hrAlign="space-between"
                height="5%"
                vrAlign="center"
                paddingBottom="xs"
              >
                <Box
                  onClick={() => {
                    embedSliderModal.onOpen();
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
              </FlexRow>

              {owner_name && (
                <FlexRow
                  height="fit-content"
                  hrAlign="center"
                  marginBottom={"xs"}
                >
                  <Avatar src={owner_image} />
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

              <FlexColumn height="60%" vrAlign="flex-start">
                {image && (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      // marginBottom: `${style.margin.sm}`,
                    }}
                  >
                    <Image
                      src={helperIPFS(image)}
                      alt="coverImage"
                      width="100%"
                      height="100%"
                      objectFit={"cover"}
                      borderRadius={gStyle.card.borderRadius.default}
                    />
                  </div>
                )}
              </FlexColumn>

              <FlexColumn
                height={action_name ? "20%" : "30%"}
                vrAlign="flex-start"
                hrAlign="flex-start"
                padding="1% 0%"
                width="100%"
              >
                {musicplayer && (
                  <>
                    {" "}
                    <MusicPlayer
                      key={musicplayer}
                      audioUrl={`https://arweave.net/${musicplayer.substr(
                        5,
                        musicplayer.length - 5
                      )}`}
                      colorMode={colorMode}
                    />
                  </>
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
                {/* <Box width="15rem"> */}
                {description && (
                  <>
                    <Text
                      color={colorMode == "light" ? "#282828" : ""}
                      className="m-b-0"
                      maxW={titleMaxw ? titleMaxw : "90vw"}
                      fontSize={style.font.h3}
                      sx={{
                        "@media screen and (max-width: 480px)": {
                          fontSize: `${style.font.h6}`,
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
                {/* </Box> */}
              </FlexColumn>

              {/* {!address && <ConnectWallet />} */}
              {action_name && (
                <FlexColumn height="10%">
                  <ButtonNative
                    text={action_name}
                    variant="state_brand"
                    width="100%"
                    height="100%"
                    marginTop="sm"
                    marginBottom="0px"
                    onClick={async () => {
                      // await openModal();
                      // if (address) {
                      //   console.log("minting");
                      // }
                    }}
                  />
                </FlexColumn>
              )}
            </Box>
            <Box
              paddingY={style.padding.xxs}
              paddingX={style.card.padding.default}
              borderTop={style.card.border.default}
              height={"10%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
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
          </Box>
          <ModalSlider
            event={embedSliderModal}
            header={
              <FlexRow>
                <Button
                  size="sm"
                  onClick={embedSliderModal.onClose}
                  variant="state_default_hover"
                >
                  Cancel
                </Button>
              </FlexRow>
            }
          >
            <FlexColumn height="300px">
              <Text>Hello macha</Text>
            </FlexColumn>
          </ModalSlider>
        </>
      )}
    </>
  );
};

export default MCard;
