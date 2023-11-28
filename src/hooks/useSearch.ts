import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { metaResolver, queryResolver } from "@/api";
import { MetaSearchInterface, SearchInterface } from "@/interfaces";

const useSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const regex = /@0x[0-9a-fA-F]{40}/g;
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);
  let [page, setPage] = useState<any>();
  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    //console.log("check search results", searchResults);
  }, searchResults);

  const handleQuery = async (params: SearchInterface) => {
    const { searchQuery, category, slug, owner, limit, next } = params;
    setIsLoading(true);
    let query: any = {
      searchQuery: searchQuery,
      category: category,
      slug: slug,
      owner: owner,
      limit: limit ? limit : 10,
    };
    if (next) {
      query = { ...query, page: page + 1 };
    }

    let res = await queryResolver(query);
    console.log("check search results -> query", searchResults);
    if (res.data) {
      let newResults =
        next && searchResults
          ? {
              ...searchResults,
              metas: searchResults?.metas
                ? [...searchResults.metas, ...res?.data?.metas]
                : res?.data?.metas,
            }
          : res?.data;
      setSearchResults(newResults);
      if (next) {
        setPage(page + 1);
      } else {
        setPage(1);
      }
    }
    setIsLoading(false);
  };

  const handleFetch = async (params: MetaSearchInterface) => {
    const { category, slug, owner, limit, next } = params;
    setIsLoading(true);

    let query: any = {
      category: category,
      slug: slug,
      owner: owner,
      limit: 10,
    };
    if (next) {
      query = { ...query, page: page + 1 };
    }
    await metaResolver(query).then((res) => {
      //console.log("check search results -> fetch", searchResults);

      let newResults =
        next && searchResults
          ? {
              ...searchResults,
              metas: searchResults?.metas
                ? [...searchResults.metas, ...res?.data]
                : res?.data,
            }
          : { metas: res?.data };
      setSearchResults(newResults);
      if (next) {
        setPage(page + 1);
      } else {
        setPage(1);
      }
      setIsLoading(false);
    });
  };

  const handleLoad = (params: any) => {
    const { searchQuery, category, slug, owner, next } = params;

    if (searchQuery) {
      handleQuery({
        searchQuery: searchQuery,
        category: category,
        slug: slug,
        owner: owner,
        next: next,
      });
    } else {
      handleFetch({
        category: category,
        slug: slug,
        owner: owner,
        next: next,
      });
    }
  };

  const handleSearch = (params: any) => {
    handleLoad({ ...params });
  };

  const handleNext = (params: any) => {
    handleLoad({ ...params, next: true });
  };

  const handleClear = () => {
    setPage(1);
    //console.log("check search results -> clear", searchResults);
    setSearchResults(null);
  };

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;

    // Check if the input value matches the regex pattern
    if (regex.test(newValue)) {
      // If it matches, use hookSearch1 and remove the first character

      setInputValue(newValue.substring(1));
    } else {
      // If it doesn't match, use hookSearch

      setInputValue(newValue);
    }
  };

  const handleRoute = (e: any) => {
    //console.log(router, "router value");
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value;
      const searchValue = regex.test(inputValue)
        ? newValue.substring(1)
        : newValue;
      let url = `/?search=${searchValue}`;
      url = `/?id=${router?.query?.id}&search=${searchValue}`;
      if (router?.query?.id) {
      }
      router.push(url);
    }
  };

  const handleEnter = (e: any) => {
    console.log("e key", e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value;
      const searchValue = regex.test(inputValue)
        ? newValue.substring(1)
        : newValue;
      handleQuery({ searchQuery: searchValue });
    }
  };

  return {
    handleInputChange,
    handleRoute: handleRoute,
    handleSearch: handleSearch,
    handleNext: handleNext,
    handleEnter: handleEnter,
    isLoading: isLoading,
    inputValue: inputValue,
    searchRef: searchRef,
    searchResults: searchResults,
  };
};

export default useSearch;
