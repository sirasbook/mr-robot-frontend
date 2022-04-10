import React from "react";
import { useFFUFData } from "../../hook/useFFUFData";
import "./leaked.scss";

import Loader from "../../components/Loader";

const Leaked = () => {
  const url = sessionStorage.getItem("url");
  const { data, isLoading, isFetching, error, isError, refetch } =
    useFFUFData(url);

  if (isLoading || isFetching) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <Loader msg={`Scanning`} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="leaked-container" id="leaked-dir">
        <h2>Leaked directories and files</h2>
        <p>Scanning Failed: {error.message}</p>
        <button onClick={refetch}>Retry Again</button>
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
        {!info["content-type"].length ? (
          <td>N/A</td>
        ) : (
          <td>{info["content-type"]}</td>
        )}
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
