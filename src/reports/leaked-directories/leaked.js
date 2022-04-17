import React, { useState, useMemo, useEffect } from "react";
import { useFFUFData } from "../../hook/useFFUFData";
import "./leaked.scss";
import Loader from "../../components/Loader";
import Pagination from "../../components/dataTable/pagination";

const Leaked = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const url = sessionStorage.getItem("url");
  const { data, isLoading, isFetching, error, isError, refetch } =
    useFFUFData(url);

  useEffect(() => {
    setTotalItems(data?.data?.total);
  }, [data?.data?.data]);

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

  const displayBody = data?.data?.data
    .slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((info, idx) => {
      const offset = (currentPage - 1) * 10;
      return (
        <tr>
          <td className="no">{idx + offset + 1}</td>
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
      <p className="total">{data?.data?.total} Directories / Files founded</p>
      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
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
