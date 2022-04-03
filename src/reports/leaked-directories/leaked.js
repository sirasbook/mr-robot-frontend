import React from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { fetchFFUFData } from "../../utils/fetcher";
import "./leaked.scss";

const Leaked = () => {
  const url = sessionStorage.getItem("url");
  const query = useQuery(["ffuf", url], fetchFFUFData);

  if (query.isLoading) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <ClipLoader />
      </div>
    );
  }

  if (query.error) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <p className="error">Error!!!</p>
      </div>
    );
  }

  const { data } = query;
  const displayBody = data?.data?.map((info, idx) => {
    console.log(info.url);
    return (
      <tr>
        <td className="no">{idx}</td>
        <td>
          <a href={info.url}>{info.url}</a>
        </td>
        {info.content_type === "" ? <td>N/A</td> : <td>{info.content_type}</td>}
      </tr>
    );
  });

  return (
    <div className="leaked-container" id="leaked-dir">
      <h2>Leaked directories and files</h2>
      <p className="total">{data.total} Directories / Files founded</p>
      <table className="table">
        <thead>
          <tr>
            <th className="no">No.</th>
            <th>Directory / File</th>
            <th>Content Type</th>
          </tr>
        </thead>
        <tbody>{displayBody}</tbody>
      </table>
    </div>
  );
};

export default Leaked;
