import React from "react";

export const NmapPortItem = ({ port }) => {
  return (
    <tr key={port["@portid"]}>
      <td>{port["@portid"]}</td>
      <td>{port["@protocol"]}</td>
      <td>{port.service["@name"]}</td>
      <td>{port.state["@state"]}</td>
    </tr>
  );
};
