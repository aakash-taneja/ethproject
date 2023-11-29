import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import FlexColumn from "../flex/FlexColumn";
import { useRouter } from "next/router";
import { style } from "@/styles/StyledConstants";
import SearchCol from "@/components/SearchCol";
import useSearch from "@/hooks/useSearch";
import SearchHeader from "@/components/SearchHeader";

type Props = {
  hookSearch?: any;
};

const Msearch = ({ hookSearch }: Props) => {
  const router = useRouter();
  const colorMode = router.query.theme;

  return (
    <Box width={"100%"} padding={style.padding.sm} height={"80%"}>
      <Box>
        <SearchHeader hookSearch={hookSearch} />
      </Box>
      <Box marginTop={style.margin.sm} height={"85%"} overflowY={"scroll"}>
        {hookSearch?.searchResults && (
          <FlexColumn
            hrAlign="flex-start"
            vrAlign="flex-start"
            width="100%"
            marginBottom="sm"
          >
            <Box
              paddingTop={style.margin.navBoth}
              display={"flex"}
              width="100%"
              justifyContent={"center"}
            >
              <>
                <FlexColumn>
                  <Box marginTop={style.margin.sm} width="100%">
                    <SearchCol
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      results={hookSearch?.searchResults}
                      router={router}
                    />
                  </Box>
                </FlexColumn>
              </>
            </Box>
          </FlexColumn>
        )}
      </Box>
    </Box>
  );
};

export default Msearch;
