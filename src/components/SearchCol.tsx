import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import FlexColumn from "@/_ui/flex/FlexColumn";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import PostCard from "@/_ui/cards/PostCard";

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
        {/* {!isLoading && !results?.length && <EmptyCard />} */}
        {results && (
          <FlexColumn width="100%">
            <FlexRow hrAlign="flex-start" marginBottom="xs">
              <PostCard
                // title={item?.meta?.data?.modified?.meta_title}

                // image={results?.modified?.media}
                metaName={results?.modified?.name}
                slug={results?.modified?.tokenId}
                description={results?.modified?.desc}
                title={results?.modified?.name}
                owner_name={results?.modified?.name}
                // onClick={() => {
                //   router.push(`/search/meta/${results?._id}`);
                // }}
                width="100%"
              />
            </FlexRow>
            {/* {results?.map((item: any, index: any) => {
              console.log("item", item);
              return (
                
              );
            })} */}
            {/* {!isLoading && (
              <ButtonNative
                text="Display More Results"
                variant="state_empty_brand_to_solid_brand"
                size="xs"
                onClick={next}
                borderColor="#2448c7"
              />
            )} */}
          </FlexColumn>
        )}
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
