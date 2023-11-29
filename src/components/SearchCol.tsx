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
        {results && Array.isArray(results) ? (
          <FlexColumn width="100%">
            {results.map((result: any, index: any) => (
              <FlexRow key={index} hrAlign="flex-start" marginBottom="xs">
                <PostCard
                  // title={item?.meta?.data?.modified?.meta_title}
                  image={result?.document?.modified?.media?.asset?.image?.optimized?.uri}
                  metaName={result?.document?.modified?.name}
                  slug={result?.document?.modified?.tokenId}
                  description={result?.document?.modified?.desc}
                  title={result?.document?.modified?.name}
                  owner_name={result?.document?.modified?.name}
                  onClick={async () => {
                    router.push(`/app/meta?id=${result?.document?.raw?.id}?type=lens_publication`);
                  }}
                  width="100%"
                />
              </FlexRow>
            ))}
          </FlexColumn>
        ) : (
          <PostCard
            // title={item?.meta?.data?.modified?.meta_title}
            image={results?.modified?.media?.asset?.image?.optimized?.uri}
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
