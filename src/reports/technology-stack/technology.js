import React from "react";
import "./technology.scss";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { fetchWAPPData } from "../../utils/fetcher";

const TechnologyStack = () => {
  let check = new Set();
  const url = sessionStorage.getItem("url");

  const { isLoading, data, error } = useQuery(["wapp", url], fetchWAPPData);

  if (isLoading) {
    return (
      <div className="tech-container" id="technology">
        <div className="flex-col">
          <h2>Technology-stack used by the provided website</h2>
          <ClipLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tech-container" id="technology">
        <div className="flex-col">
          <h2>Technology-stack used by the provided website</h2>
          <p className="error">Error!!!</p>
        </div>
      </div>
    );
  }

  const displayData = data.map((info) => {
    const displayBody = info.data.map((body) => {
      return (
        <tr>
          <td className="flex-row">
            <a
              style={{ marginRight: "10px" }}
              href={`https://www.wappalyzer.com/technologies/${info.slug}/${body.slug}`}
            >
              {body.name}
            </a>
            {body.version === null ? null : (
              <div className="version">{body.version}</div>
            )}
          </td>
        </tr>
      );
    });

    if (!check.has(info.id)) {
      check.add(info.id);
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>{info.name}</th>
              </tr>
            </thead>
            <tbody id={info.name}>{displayBody}</tbody>
          </table>
        </div>
      );
    }

    return null;
  });

  return (
    <div className="tech-container" id="technology">
      <div className="flex-col">
        <h2>Technology-stack used by the provided website</h2>
        <div className="contain">{displayData}</div>
      </div>
    </div>
  );
};

export default TechnologyStack;
