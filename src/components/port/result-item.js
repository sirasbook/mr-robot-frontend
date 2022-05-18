import React from "react";
import { NmapPortItem } from "./result-port-item";

const NmapResultItem = ({ host }) => {
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

export default NmapResultItem;
