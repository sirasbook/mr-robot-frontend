import React, { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useNmapWebSocket } from "../../hook/useNmapData";
import { NmapPortItem } from "./result-port-item";
import Loader from "../../components/Loader";

const PortItem = ({ url }) => {
  const { data, isLoading, isError } = useNmapWebSocket(url);
  const { ports, hostnames, address, nmaprun } = data;

  const refetch = () => {
    window.location.reload();
  };

  if (isError) {
    return (
      <div>
        <h3>{url}</h3>
        <p>Scanning Failed</p>
        <button onClick={refetch}>Retry Again</button>
      </div>
    );
  }

  return (
    <>
      <h3>{url}</h3>
      <h5>
        <strong>Hostnames</strong>
      </h5>
      {hostnames.length > 0 ? (
        <ul className="hostnames">
          {hostnames?.map(({ hostname }) => (
            <li>{hostname["@name"]}</li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
      <h5>
        <strong>Address</strong>
      </h5>
      {address && (
        <ul className="address">
          <li>
            <strong>Address</strong>: {address["@addr"]}
          </li>
          <li>
            <strong>Type</strong>: {address["@addrtype"]?.toUpperCase()}
          </li>
        </ul>
      )}
      {isLoading ? (
        <Loader />
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
            {ports?.map(({ port }) => (
              <NmapPortItem port={port} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PortItem;
