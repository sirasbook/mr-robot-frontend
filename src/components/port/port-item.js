import React, { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useNmapWebSocket } from "../../hook/useNmapData";
import { NmapPortItem } from "./result-port-item";

const initialState = {
  hostnames: [],
  address: null,
  ports: [],
  nmaprun: null,
};

const PortItem = ({ url }) => {
  const [data, setData] = useState(initialState);
  const { sendJsonMessage, getWebSocket, lastJsonMessage, readyState } =
    useNmapWebSocket(url);

  useEffect(() => {
    if (!getWebSocket()) return;
    setData(initialState);
    sendJsonMessage({ url });
  }, [getWebSocket()]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    switch (lastJsonMessage.type) {
      case "address":
        setData((d) => ({ ...d, ...lastJsonMessage.data }));
        break;
      case "hostname":
        setData((d) => ({
          ...d,
          hostnames: [...d.hostnames, lastJsonMessage.data],
        }));
        break;
      case "port":
        setData((d) => ({ ...d, ports: [...d.ports, lastJsonMessage.data] }));
        break;
      case "final":
        setData((d) => ({ ...d, ...lastJsonMessage.data }));
        break;
      default:
        break;
    }
  }, [lastJsonMessage]);

  const { ports, hostnames, address, nmaprun } = data;

  return (
    <>
      <h3>{url}</h3>
      <h5>
        <strong>Hostnames</strong>
      </h5>
      {hostnames.length > 0 && (
        <ul className="hostnames">
          {hostnames?.map(({ hostname }) => (
            <li>{hostname["@name"]}</li>
          ))}
        </ul>
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
    </>
  );
};

export default PortItem;
