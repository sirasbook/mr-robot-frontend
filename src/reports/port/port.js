import React from "react";
import "./port.scss";

import psl from "psl";
import { useNmapData } from "../../hook/useNmapData";
import { useEnumData } from "../../hook/useEnumData";

import Loader from "../../components/Loader";
import PortItem from "../../components/port/port-item";

const Port = () => {
  const url = sessionStorage.getItem("url")?.replace(/^http[s]?:\/\//, "");
  const { domain } = psl.parse(url);

  // const [{ data: enumData }] = useEnumData(domain, { enabled: false });

  const urls = [
    ...new Set([
      // ...(enumData?.data.domains[0].names.map((item) => item.name) || []),
      url,
      "https://www.chula.ac.th",
      "https://classdeedee.cloud.cp.eng.chula.ac.th",
    ]),
  ];

  // const nmapData = useNmapData(urls);

  // const handleRetry = () => {
  //   nmapData.forEach((item) => {
  //     if (item.isError) item.refetch();
  //   });
  // };

  return (
    <>
      <div className="port-container" id="port">
        <h2>Port Scan</h2>
        <ul>
          {urls.map((url) => {
            return (
              <PortItem key={url} url={url} />
              // <div className="port-item">
              //   {isLoading || isFetching ? (
              //     <Loader msg={`Scanning`} />
              //   ) : (
              //     !isError &&
              //     data && (
              //       <NmapResultItem
              //         key={
              //           data?.data.nmaprun.host.hostnames.hostname["@name"]
              //         }
              //         host={data?.data.nmaprun.host}
              //         handleRefetch={refetch}
              //       />
              //     )
              //   )}
              // </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Port;
