import React from "react";
import "./port.scss";

import psl from "psl";
import { useNmapData } from "../../hook/useNmapData";
import { useEnumData } from "../../hook/useEnumData";

import Loader from "../../components/Loader";

const NmapPortItem = ({ port }) => {
  return (
    <tr key={port["@portid"]}>
      <td>{port["@portid"]}</td>
      <td>{port["@protocol"]}</td>
      <td>{port.service["@name"]}</td>
      <td>{port.state["@state"]}</td>
    </tr>
  );
};
const NmapResultItem = ({ host, handleRefetch = () => {} }) => {
  const {
    hostnames: { hostname },
    address,
    ports,
  } = host;

  return (
    <>
      <h3>{hostname["@name"]}</h3>
      <ul className="">
        <li>
          <strong>Address</strong>: {address["@addr"]}
        </li>
        <li>
          <strong>Type</strong>: {address["@addrtype"]?.toUpperCase()}
        </li>
      </ul>
      {!ports?.port ? (
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <h5>
            <strong>Not Found </strong>
          </h5>
          <button onClick={handleRefetch}>Try Scan The Host Again</button>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>Port Number</td>
              <td>Protocol</td>
              <td>Service</td>
              <td>State</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(ports.port) ? (
              ports?.port.map((portItem) => <NmapPortItem port={portItem} />)
            ) : (
              <NmapPortItem port={ports.port} />
            )}{" "}
          </tbody>
        </table>
      )}
    </>
  );
};

const Port = () => {
  const url = sessionStorage.getItem("url")?.replace(/^http[s]?:\/\//, "");
  const { domain } = psl.parse(url);

  const [{ data: enumData }] = useEnumData(domain, { enabled: false });
  const urls = [
    ...new Set([
      ...(enumData?.data.domains[0].names.map((item) => item.name) || []),
      url,
    ]),
  ];
  const nmapData = useNmapData(urls);

  const handleRetry = () => {
    nmapData.forEach((item) => {
      if (item.isError) item.refetch();
    });
  };

  return (
    <>
      <div className="port-container" id="port">
        <h2>Port Testing</h2>
        {nmapData.map((item) => item.isError).some(Boolean) && (
          <button onClick={handleRetry}>Retry Failed Request Again</button>
        )}
        <ul>
          {nmapData
            ?.sort((_, b) => b.isFetched)
            .map(({ data, isLoading, isFetching, isError, refetch }) => {
              return (
                <div className="port-item">
                  {isLoading || isFetching ? (
                    <Loader msg={`Scanning`} />
                  ) : (
                    !isError &&
                    data && (
                      <NmapResultItem
                        key={
                          data?.data.nmaprun.host.hostnames.hostname["@name"]
                        }
                        host={data?.data.nmaprun.host}
                        handleRefetch={refetch}
                      />
                    )
                  )}
                </div>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Port;
