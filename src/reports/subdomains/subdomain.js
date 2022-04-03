import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import "./subdomain.scss";

import psl from "psl";

import SubdomainGraph from "../../components/amass/force-graph";
import { ClipLoader } from "react-spinners";
import { SubdomainList } from "../../components/subdomain";
import {
  fetchEnumData,
  fetchGraphEnumData,
  fetchLatestEnumData,
} from "../../utils/fetcher";

const useSummary = (data) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (!data) return;
    const addresses = data.domains[0].names.reduce((addrs, name) => {
      return [...addrs, ...name.addresses];
    }, []);

    const summary = addresses.reduce((acc, addr) => {
      const asn = addr.asn || "unknown";

      if (!acc[asn]) acc[asn] = [addr];
      else acc[asn] = [...acc[asn], addr];

      return acc;
    }, {});

    Object.keys(summary).forEach((asn) => {
      summary[asn] = summary[asn].reduce((acc, addr) => {
        const cidr = addr.cidr;

        acc.desc = addr.desc;
        if (!acc.cidr) acc.cidr = {};

        if (!acc.cidr[cidr]) acc.cidr[cidr] = [addr];
        else acc.cidr[cidr] = [...acc.cidr[cidr], addr];

        return acc;
      }, {});
    });

    setState(summary);
  }, [data]);

  return state;
};

const Subdomain = () => {
  const history = useHistory();
  const location = useLocation();

  const url = sessionStorage.getItem("url")?.replace(/^https?:\/\//, "");

  // Extract domain name from url
  const domain = psl.get(url);

  // 1. Perform enumeration on input domain
  const enumQuery = useQuery(["enum", url], fetchEnumData);

  // 2. Retrieve latest enumeration data
  const latestEnumQuery = useQuery(
    ["latest-enum", domain],
    fetchLatestEnumData,
    {
      enabled: !!enumQuery.isFetched,
    }
  );

  // 3. Retrieve graph data of the latest enumeration data
  const [openedDetails, setOpenedDetails] = useState(new Set());

  const enumData = latestEnumQuery?.data;

  const summary = useSummary(enumData);

  const graphQuery = useQuery(["graph", domain], fetchGraphEnumData, {
    enabled: !!enumData,
  });

  const isLoading = [
    enumQuery.isLoading,
    latestEnumQuery.isLoading,
    graphQuery.isLoading,
  ].some(Boolean);

  const isFetching = [
    enumQuery.isFetching,
    latestEnumQuery.isFetching,
    graphQuery.isFetching,
  ].some(Boolean);

  const isError = [
    enumQuery.isError,
    latestEnumQuery.isError,
    graphQuery.isError,
    !domain,
  ].some(Boolean);

  if (isLoading || isFetching) {
    if (enumQuery.isLoading || enumQuery.isFetching)
      return (
        <div className="subdomain-container" id="subdomain">
          <h2>Found Subdomains</h2>
          <p>Enumerating...</p>
          <div className="loading">
            <ClipLoader />
          </div>
        </div>
      );
    if (
      latestEnumQuery.isLoading ||
      latestEnumQuery.isFetching ||
      graphQuery.isLoading ||
      graphQuery.isFetching
    )
      return (
        <div className="subdomain-container" id="subdomain">
          <h2>Found Subdomains</h2>
          <p>Fetching Result...</p>
          <div className="loading">
            <ClipLoader />
          </div>
        </div>
      );
  }

  if (isError) {
    return (
      <div className="subdomain-container" id="subdomain">
        <h2>Found Subdomains</h2>
        <p className="error">Fail with error</p>
      </div>
    );
  }

  const handleClick = (e) => {
    const name = e.target.text;
    setOpenedDetails((old) => {
      const val = new Set(old);
      if (!val.delete(name)) val.add(name);
      return val;
    });
  };

  const onNodeClick = (_, node) => {
    // set url to #id
    history.replace(`${location.pathname}#${node.pointLabel}`);

    // scroll to the element with that id
    const target = document.getElementById(node.pointLabel);

    // probably not exist in list
    if (!target) {
      alert("The target domain might not exist in the list");
    }

    target.scrollIntoView();
    target.nextElementSibling.classList.add("show");

    setOpenedDetails((old) => {
      const val = new Set(old);
      val.add(node.pointLabel);
      return val;
    });
  };

  const renderSummary = () => {
    return (
      <>
        {Object.entries(summary).map(([asn, info]) => (
          <div key={asn}>
            <p
              style={{
                fontWeight: `bold`,
                fontSize: `20px`,
              }}
            >
              ASN: {asn} - {info.desc}
            </p>
            <table className="table summary-table">
              <thead>
                <tr>
                  <th className="left">CDIR</th>
                  <th className="right">Subdomain Name(s)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(info.cidr)
                  .sort((l, r) => r[1].length - l[1].length)
                  .map(([cidr, addrs]) => (
                    <tr key={cidr}>
                      <td className="left">{cidr}</td>
                      <td className="right">{addrs.length}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </>
    );
  };

  const renderTagHead = () => {
    const tags = enumData?.domains[0].names.reduce((acc, name) => {
      if (!acc[name.tag]) acc[name.tag] = 0;
      acc[name.tag]++;

      return acc;
    }, {});

    if (!tags) return;

    const keys = Object.keys(tags);
    const domain = enumData?.domains[0];

    return (
      <p>
        {domain.total} names discovered -{" "}
        {keys.map((tag, idx) => (
          <span key={tag}>{`${tag}: ${tags[tag]}${
            idx < keys.length - 1 ? `, ` : ``
          }`}</span>
        ))}
      </p>
    );
  };

  return (
    <div className="subdomain-container" id="subdomain">
      <h2>Found Subdomains</h2>{" "}
      <div className="flex-row total">{renderTagHead()}</div>
      {renderSummary()}
      <div id="graph-container">
        <SubdomainGraph
          data={graphQuery.data.gResult}
          onNodeClick={onNodeClick}
        />
      </div>
      <h3>Subdomains</h3>
      <SubdomainList
        domain={enumData?.domains[0]}
        opens={openedDetails}
        onClick={handleClick}
      />
    </div>
  );
};

export default Subdomain;
