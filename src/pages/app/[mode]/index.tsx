import MCard from "@/_ui/cards/MCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { style } from "@/styles/StyledConstants";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const renderBody = () => {
    return (
      <Box overflowX="hidden">
        <FlexColumn
          hrAlign="flex-start"
          vrAlign="flex-start"
          padding="0rem 0rem"
          height="100vh"
        >
          <Box
            border={colorMode ? "" : style.card.border.default}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="100%"
            width={"100%"}
            backgroundImage={
              colorMode == "light"
                ? "url(/assets/icons/searchbg.svg)"
                : "url(/assets/explore/searchbg_light.svg)"
            }
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            justifyContent={"flex-start"}
          >
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                height={"95%"}
                width={"50%"}
                sx={{
                  "@media screen and (max-width: 950px)": {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <MCard
                  width={"50%"}
                  colorMode={router.query.theme}
                  left="25%!important"
                />
              </Box>
            </div>
          </Box>
        </FlexColumn>
      </Box>
    );
  };

  return <>{renderBody()}</>;
};

export default Search;
