import { useQuery } from "react-query";
import { client } from "../utils/axios-util";

const fetchZAPData = ({ queryKey }) => {
  const url = queryKey[1];
  const option = queryKey[2];
  return client.post(`/api/service/zap/scan`, {
    url,
    option,
  });
};

export const useZAPData = ({ url, option = "base" }, queryOptions) => {
  return useQuery(["zap", url, option], fetchZAPData, {
    select: (data) => data?.data,
    ...queryOptions,
  });
};
