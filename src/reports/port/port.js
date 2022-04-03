import React from "react";
import "./port.scss";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { fetchNMAPData } from "../../utils/fetcher";

const Port = () => {
  // const [data, setData] = useState(tempData);

  const url = sessionStorage.getItem("url");

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
      <table className="table">
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
