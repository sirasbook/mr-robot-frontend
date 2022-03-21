import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import "./subdomain.scss";

import SubdomainGraph from "../../components/amass/force-graph";
import { ClipLoader } from "react-spinners";
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

  const url = sessionStorage.getItem("url");

  // 1. Perform enumeration on input domain
  const enumQuery = useQuery(["enum", url], fetchEnumData, {
    enabled: true,
  });

  // 2. Retrieve latest enumeration data
  const latestEnumQuery = useQuery(["latest-enum", url], fetchLatestEnumData, {
    enabled: !!enumQuery.isFetched,
  });

  // 3. Retrieve graph data of the latest enumeration data

  const enumData = latestEnumQuery?.data;

  const domainName = enumData?.domains[0].domain;

  const summary = useSummary(enumData);

  const [openedDetails, setOpenedDetails] = useState(new Set());

  const graphQuery = useQuery(["graph", domainName], fetchGraphEnumData, {
    enabled: !!domainName,
  });

  // Loading
  if (
    enumQuery.isLoading ||
    latestEnumQuery.isLoading ||
    graphQuery.isLoading
  ) {
    return (
      <div className="subdomain-container" id="subdomain">
        <h2>Found Subdomains</h2>
        <ClipLoader />
        <h3>Subdomains</h3>
        <ClipLoader />
      </div>
    );
  }

  if (enumQuery.error || latestEnumQuery.error || graphQuery.error) {
    return (
      <div className="subdomain-container" id="subdomain">
        <h2>Found Subdomains</h2>
        <p className="error">Error!!!</p>
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

  const displaySubdomain = () =>
    enumData.domains[0].names.map((info, idx) => {
      const target = `target-collapse${idx}`;
      const displayData = info.addresses.map((address) => {
        return (
          <tr>
            <td>{address.ip}</td>
            <td>{address.cidr}</td>
            <td>{address.desc}</td>
          </tr>
        );
      });

      const displaySource = info.sources.map((source) => {
        return (
          <ul>
            <li>{source}</li>
          </ul>
        );
      });

      return (
        <div className="each-sub-container">
          {openedDetails.has(info.name) ? (
            <i className="bi bi-caret-down-fill"></i>
          ) : (
            <i className="bi bi-caret-up-fill"></i>
          )}
          <a
            id={info.name}
            className="collapse-link"
            data-bs-toggle="collapse"
            href={`#${target}`}
            aria-expanded="false"
            aria-controls={target}
            onClick={handleClick}
          >
            {info.name}
          </a>
          <div class="collapse" id={target}>
            <div className="subdomain">
              <div className="left">
                <p>
                  <a>Name:</a>
                </p>
                <p>Domain:</p>
                <p>Tag:</p>
                {info.addresses[0].asn !== undefined ? <p>ASN:</p> : null}
              </div>
              <div className="right">
                <p>
                  <a href={`https://${info.name}`}>{info.name}</a>
                </p>
                <p>{info.domain}</p>
                <p>{info.tag}</p>
                {info.addresses[0].asn !== undefined ? (
                  <p>{info.addresses[0].asn}</p>
                ) : null}
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>IP</th>
                  <th>CDIR</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>{displayData}</tbody>
            </table>
            <div className="source">
              <p>Sources:</p>
              {displaySource}
            </div>
          </div>
        </div>
      );
    });

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

  const tags = enumData?.domains[0].names.reduce((acc, name) => {
    if (!acc[name.tag]) acc[name.tag] = 0;
    acc[name.tag]++;

    return acc;
  }, {});

  const renderTagHead = () => {
    const keys = Object.keys(tags);
    const domain = enumData.domains[0];

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
      <h2>Found Subdomains</h2>
      <div className="flex-row total">{renderTagHead()}</div>
      {renderSummary()}
      <div id="graph-container">
        <SubdomainGraph
          data={graphQuery.data.gResult}
          onNodeClick={onNodeClick}
        />
      </div>
      <h3>Subdomains</h3>
      {displaySubdomain()}
    </div>
  );
};

export default Subdomain;
