import { helperIPFS } from "@/helpers";
import { fetchArweaveData, graphQuery } from "@/service/MetaService";
import { useState } from "react";

const useGraph = () => {
  const [mData, setMData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [audioUrl, setAudioUrl] = useState<any>();
  const [audioCover, setAudioCover] = useState<any>();

  const _fetch = async (id: string, type: string) => {
    const data = {
      data: id,
    };
    console.log("inside usegaph", type, data);
    const res = await graphQuery(type, data);
    const audiodata = await fetchArweaveData(
      helperIPFS(res?.document?.raw?.metadata?.rawURI)
    );
    console.log("res", res);
    setMData(res);
    setAudioUrl(helperIPFS(audiodata?.lens?.audio?.item));
    setAudioCover(helperIPFS(audiodata?.lens?.audio?.cover));
    setIsLoading(false);
  };

  return {
    _fetch: _fetch,
    mData: mData,
    isLoading: isLoading,
    audioUrl: audioUrl,
    audioCover: audioCover,
  };
};

export default useGraph;
