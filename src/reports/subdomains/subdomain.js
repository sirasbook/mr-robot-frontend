import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./subdomain.scss";

import psl from "psl";

import SubdomainGraph from "../../components/amass/force-graph";
import { ClipLoader } from "react-spinners";
import { SubdomainList } from "../../components/subdomain";
import { useEnumData, useEnumerate } from "../../hook/useEnumData";
import { Summary } from "../../components/subdomain/Summary";

const useSummary = (data) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (!data?.data) return;
    const addresses = data?.data.domains[0].names.reduce((addrs, name) => {
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

  const [openedDetails, setOpenedDetails] = useState(new Set());

  const handleClick = (e) => {
    const name = e.target.text;
    setOpenedDetails((old) => {
      const val = new Set(old);
      if (!val.delete(name)) val.add(name);
      return val;
    });
  };

  const url = sessionStorage.getItem("url")?.replace(/^https?:\/\//, "");
  // 1. Perform enumeration on input domain
  const {
    isLoading: enumIsLoading,
    isFetching: enumIsFetching,
    error: enumError,
    isError: enumIsError,
    isSuccess: enumIsSuccess,
    refetch: enumRefetch,
  } = useEnumerate(url, {
    mode: 0,
    timeout: 10,
  });

  // Extract domain name from url
  const domain = psl.get(url);
  // 2. Retrieve latest enumeration data & Retrieve graph data of the latest enumeration data
  const [
    {
      data: enumData,
      isLoading: enumDataIsLoading,
      isFetching: enumDataIsFetching,
      error: enumDataError,
      isError: enumDataIsError,
    },
    {
      data: enumGraphData,
      isLoading: enumGraphDataIsLoading,
      isFetching: enumGraphDataIsFetching,
      error: enumGraphDataError,
      isError: enumGraphDataIsError,
    },
  ] = useEnumData(domain, {
    enabled: !!enumIsSuccess,
  });

  const summary = useSummary(enumData);

  if (enumIsLoading || enumIsFetching) {
    // Subdomain enumerating
    return (
      <div className="subdomain-container" id="subdomain">
        <h3>
          Enumeration Performing...
          <ClipLoader />
        </h3>
      </div>
    );
  }

  if (enumIsError) {
    return (
      <div className="subdomain-container" id="subdomain">
        <h2>Found Subdomains</h2>{" "}
        <h3 stlye={{ color: `red` }}>
          Enumeration Failed: {enumError.message}
        </h3>
        <button onClick={enumRefetch}>Retry again</button>
      </div>
    );
  }

  if (
    enumDataIsLoading ||
    enumDataIsFetching ||
    enumGraphDataIsLoading ||
    enumGraphDataIsFetching
  ) {
    // Subdomain enumerating
    return (
      <div className="subdomain-container" id="subdomain">
        <h2>Found Subdomains</h2>{" "}
        <h3>
          Fetching the results
          <ClipLoader />
        </h3>
      </div>
    );
  }

  const onNodeClick = (_, node) => {
    // set url to #id
    history.replace(`${location.pathname}#${node.pointLabel}`);

    // scroll to the element with that id
    const target = document.getElementById(node.pointLabel);

    // probably not exist in list
    if (!target) {
      // TODO: More proper Not Found handler
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

  const renderTagHead = () => {
    const tags = enumData?.data.domains[0].names.reduce((acc, name) => {
      if (!acc[name.tag]) acc[name.tag] = 0;
      acc[name.tag]++;

      return acc;
    }, {});

    if (!tags) return;

    const keys = Object.keys(tags);
    const domain = enumData?.data.domains[0];

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
      {!enumDataIsError && <Summary summary={summary} />}
      {enumGraphDataIsError ? (
        <h3>Fetch Graph Data Failed: {enumGraphDataError.message}</h3>
      ) : (
        <div id="graph-container">
          <SubdomainGraph
            data={enumGraphData?.data.gResult}
            onNodeClick={onNodeClick}
          />
        </div>
      )}
      <h3>Subdomains</h3>
      {enumDataIsError ? (
        <h3>Fetch Enumeration Data Failed: {enumDataError.message}</h3>
      ) : (
        <SubdomainList
          domain={enumData?.data.domains[0]}
          opens={openedDetails}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default Subdomain;
