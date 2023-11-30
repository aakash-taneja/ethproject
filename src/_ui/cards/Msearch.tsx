import SearchCol from "@/components/SearchCol";
import SearchHeader from "@/components/SearchHeader";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import FlexColumn from "../flex/FlexColumn";
import Loader1 from "../loader/Loader1";

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
        {!hookSearch.isLoading ?
          (<>
            {hookSearch?.searchResults !== undefined && (
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
            {(hookSearch?.searchResults === null && (
              <Box>
                <Text>No results found</Text>
              </Box>
            ))}
          </>) : (
            <FlexColumn>
              <Loader1 />
            </FlexColumn>
          )}
      </Box>
    </Box>
  );
};

export default Msearch;
