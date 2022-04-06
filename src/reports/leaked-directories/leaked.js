import React from "react";
import { ClipLoader } from "react-spinners";
import { useFFUFData } from "../../hook/useFFUFData";
import "./leaked.scss";

const Leaked = () => {
  const url = sessionStorage.getItem("url");
  const { data, isLoading, isFetching, error, isError } = useFFUFData(url);

  if (isLoading || isFetching) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <h3>
          Scanning...
          <ClipLoader />
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <h3>
          Scanning Failed: {error.message}
          <ClipLoader />
        </h3>
      </div>
    );
  }

  const displayBody = data?.data?.data.map((info, idx) => {
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
