import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style as gStyle, style } from "@/styles/StyledConstants";
import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Loader1 from "../loader/Loader1";
import ModalSlider from "../modal/ModalSlider";
import Mcontent from "./Mcontent";
import Mheader from "./Mheader";
import Msearch from "./Msearch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSearch from "@/hooks/useSearch";
import useGraph from "@/hooks/useGraph";

type Props = {
  width?: any;
  left?: any;
  colorMode?: any;
};

const MCard = ({ colorMode, width, left }: Props) => {
  const detailsModal = useDisclosure();
  const walletModal = useDisclosure();
  const router = useRouter();
  const hookSearch = useSearch();

  const [loading, setLoading] = useState<boolean>(false);
  const [metaRequest, setMetaRequest] = useState<any>();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.id && router.query.type) {
        setMetaRequest({ id: router.query.id, type: router.query.type });
      }
    }
  }, [router.isReady,router.query.id,router.query.type]);

  // const playAudio = (e: any) => {
  //   setIsPlaying(true);
  //   e.stopPropagation();
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };
  // const stopAudio = (e: any) => {
  //   setIsPlaying(false);
  //   e.stopPropagation();
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //   }
  // };
  // const handleAudioEnded = () => {
  //   setIsPlaying(false); // Update isPlaying to false when audio ends
  // };

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
        justifyContent={"space-between"}
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
            <Mheader detailsModal={detailsModal} walletModal={walletModal} />
            {router.query.mode == "search" && (
              <Msearch hookSearch={hookSearch} />
            )}
            {router.query.mode == "meta" && (
              <Mcontent
                // hookGraph={hookGraph}
                metaId={metaRequest?.id}
                metaType={metaRequest?.type}
              />
            )}

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
        width={width}
        left={left}
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
        width={width}
        left={left}
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
        <FlexColumn height="150px" hrAlign="flex-start">
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
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
