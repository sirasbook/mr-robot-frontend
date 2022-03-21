import React, { useState } from "react";
import "./port.scss";
import tempData from "../../data/port.json";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

const Port = () => {
  // const [data, setData] = useState(tempData);

  const url = sessionStorage.getItem("url");

  const fetchNMAPData = async () => {
    // return fetch("http://localhost/api/service/nmap/scan", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     url: `${url}`,
    //   }),
    // }).then((res) => res.json());

    // TODO: use code above to fetch instead
    return tempData;
  };

  const { isLoading, data, error } = useQuery(["nmap", url], fetchNMAPData, {
    enabled: !!url,
  });

  if (isLoading) {
    return (
      <div className="port-container" id="port">
        <h2>Port founded</h2>
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="port-container" id="port">
        <h2>Port founded</h2>
        <p className="error">Error!!!</p>
      </div>
    );
  }

  console.log("data", data);

  const displayBody = data.nmaprun.host.ports.port.map((info) => {
    return (
      <tr>
        <td>{info["-portid"]}</td>
        <td>{info["-protocol"]}</td>
        <td>{info.state["-state"]}</td>
        <td>{info.service["-name"]}</td>
      </tr>
    );
  });

  return (
    <div className="port-container" id="port">
      <h2>Port founded</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Port</th>
            <th>Protocol</th>
            <th>State</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>{displayBody}</tbody>
      </table>
    </div>
  );
};

export default Port;
