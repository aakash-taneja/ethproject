import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import FlexColumn from "@/_ui/flex/FlexColumn";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import PostCard from "@/_ui/cards/PostCard";
import { truncateAddress } from "@/helpers";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  results?: any;
  router?: any;
  isLoading?: any;
  next?: any;
};

const SearchCol = ({ results, router, isLoading, next }: Props) => {
  console.log("results", results);
  return (
    <>
      <FlexColumn>
        <FlexColumn width="100%">
          {results !== null && results?.map((result: any, index: any) => (
            <FlexRow key={index} hrAlign="flex-start" marginBottom="xs">
              <PostCard
                // title={item?.meta?.data?.modified?.meta_title}
                image={
                  result?.document?.modified?.media?.asset?.image?.optimized
                    ?.uri
                }
                metaName={result?.document?.modified?.owner}
                slug={result?.document?.slug}
                description={result?.document?.modified?.desc}
                title={result?.document?.modified?.name}
                owner_address={truncateAddress(
                  result.document?.modified?.owner
                )}
                owner_name={result?.document?.modified?.owner}
                onClick={async () => {
                  router.push(
                    `/meta?id=${result?.document?.raw?.id}&&type=${result?.document?.slug}`
                  );
                }}
                width="100%"
              />
            </FlexRow>
          ))}
          {results === null && (
            <Box>
              <Text>
                No results found
              </Text>
            </Box>
          )}
        </FlexColumn>

        {isLoading && (
          <FlexRow height="200px">
            <Loader size="lg" />
          </FlexRow>
        )}
      </FlexColumn>
    </>
  );
};
export default SearchCol;
