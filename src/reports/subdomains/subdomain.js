import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./subdomain.scss";

import SubdomainGraph from "../../components/amass/force-graph";

import tempData from "../../data/enum_result.json";
import graphData from "../../data/data.json";

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
  const [data, setData] = useState(tempData);
  const history = useHistory();
  const location = useLocation();
  const summary = useSummary(data);
  const domain = data.domains[0];

  const [openedDetails, setOpenedDetails] = useState(new Set());

  let c = 0;
  let d = {};

  const handleClick = (e) => {
    const name = e.target.text;
    setOpenedDetails((old) => {
      const val = new Set(old);
      if (!val.delete(name)) val.add(name);
      return val;
    });
  };

  const displaySubdomain = () =>
    data.domains[0].names.map((info) => {
      c += 1;
      let target = "target" + c;
      let targetId = "#" + target;

      if (info.tag in d) {
        d[`${info.tag}`] += 1;
      } else {
        d[`${info.tag}`] = 1;
      }

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
            href={targetId}
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
            <table class="table">
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
                fontSize: `20px`
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

  const tags = domain.names.reduce((acc, name) => {
    if (!acc[name.tag]) acc[name.tag] = 0;
    acc[name.tag]++;

    return acc;
  }, {});

  const renderTagHead = () => {
    const keys = Object.keys(tags);

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
      <div className="flex-row total">
        {renderTagHead()}
      </div>
      {renderSummary()}
      <h2>Found Subdomains</h2>
      {/* TODO: Graph */}
      <div id="graph-container">
        <SubdomainGraph data={graphData} onNodeClick={onNodeClick} />
      </div>
      <h3>Subdomains</h3>
      {displaySubdomain()}
    </div>
  );

  // const domain = data.domains[0];

  // const tags = domain.names.reduce((acc, name) => {
  //   if (!acc[name.tag]) acc[name.tag] = 0;
  //   acc[name.tag]++;

  //   return acc;
  // }, {});

  // const renderTagHead = () => {
  //   const keys = Object.keys(tags);

  //   return (
  //     <p>
  //       {domain.total} names discovered -{" "}
  //       {keys.map((tag, idx) => (
  //         <span key={tag}>{`${tag}: ${tags[tag]}${
  //           idx < keys.length - 1 ? `, ` : ``
  //         }`}</span>
  //       ))}
  //     </p>
  //   );
  // };

  // return (
  //   <div className="subdomain-container">
  //     <h2>Found Subdomains</h2>
  //     <div className="flex-row total">{renderTagHead()}</div>
  //     {/* TODO: Summary */}
  //     {/* TODO: Graph */}
  //     <h3>Subdomains</h3>
  //   </div>
  // );
};

export default Subdomain;
