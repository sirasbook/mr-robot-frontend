import React from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { fetchZAPData } from "../../utils/fetcher";
import "./alert.scss";

const Alert = () => {
  let total = 0;

  const url = sessionStorage.getItem("url");
  const option = sessionStorage.getItem("zap-option");
  const { isLoading, isFetching, data, error } = useQuery(
    ["zap", url, option],
    fetchZAPData
  );

  if (isLoading || isFetching) {
    return (
      <div className="alert-container" id="alert">
        <h2>Alert summary</h2>
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert-container" id="alert">
        <h2>Alert summary</h2>
        <p className="error">Error!!!</p>
      </div>
    );
  }

  const displayAlertSummary = data?.alerts?.map((info) => {
    total = total + parseInt(info.count);
    return (
      <tr>
        <td className="center">
          <a href={`https://www.zaproxy.org/docs/alerts/${info.refid}`}>
            {info.refid}
          </a>
        </td>
        <td>
          <a href={`#${info.name}`}>{info.name}</a>
        </td>
        <td>{info.risk.split("(")[0]}</td>
        <td className="count">{info.count}</td>
      </tr>
    );
  });

  const displayAlertDetail = data?.alerts?.map((info) => {
    const displayURL = info.instances.map((instance) => {
      return (
        <tbody>
          <tr>
            <td className="left">URL</td>
            <td>
              <a href={instance.uri}>{instance.uri}</a>
            </td>
          </tr>
          <tr>
            <td className="left-sub">Method</td>
            <td className="sub">{instance.method}</td>
          </tr>
          <tr>
            <td className="left-sub">Parameter</td>
            <td className="sub">{instance.param}</td>
          </tr>
          <tr>
            <td className="left-sub">Attack</td>
            <td className="sub">{instance.attack}</td>
          </tr>
          <tr>
            <td className="left-sub">Evidence</td>
            <td className="sub">{instance.evidence}</td>
          </tr>
        </tbody>
      );
    });

    const reference = info.reference.split("<p>");
    for (var i in reference) {
      reference[i] = reference[i].split("</p>")[0];
    }

    const renderReference = reference.map((ref) => {
      return (
        <tr>
          <a href={ref}>{ref}</a>
        </tr>
      );
    });

    return (
      <table className="table table-detail" id={info.name}>
        <thead>
          <tr>
            <th className="risk">{info.risk.split("(")[0]} Risk</th>
            <th>{info.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="left">Description</td>
            <td>{info.description.replace(/(<([^>]+)>)/gi, "\n")}</td>
          </tr>
          <tr>
            <td className="left">Solution</td>
            <td>{info.solutions.replace(/(<([^>]+)>)/gi, "\n")}</td>
          </tr>
        </tbody>
        {displayURL}
        <tbody>
          <tr>
            <td className="left">Reference</td>
            <td>{renderReference}</td>
          </tr>
          <tr>
            <td className="left">CWE ID</td>
            <td>
              <a
                href={`https://cwe.mitre.org/data/definitions/${info.cweid}.html`}
              >
                {info.cweid}
              </a>
            </td>
          </tr>
          <tr>
            <td className="left">Reference ID</td>
            <td>
              <a href={`https://www.zaproxy.org/docs/alerts/${info.refid}`}>
                {info.refid}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  });

  return (
    <div className="alert-container" id="alert">
      <h2>Alert summary</h2>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="center">Reference ID</th>
            <th>Alert Type</th>
            <th>Risk Level</th>
            <th className="count">Count</th>
          </tr>
        </thead>
        <tbody>
          {displayAlertSummary}
          <tr>
            <td className="total center">Total</td>
            <td className="total"></td>
            <td className="total"></td>
            <td className="total">{total}</td>
          </tr>
        </tbody>
      </table>
      <h2 style={{ paddingTop: "30px" }}>Alert Details</h2>
      {displayAlertDetail}
    </div>
  );
};

export default Alert;
