import { useState } from "react";

export const SubdomainData = ({ subname }) => {
  if (!subname.addresses) {
    return <h1>Error Render SubdomainDate</h1>;
  }

  return (
    <>
      {subname.addresses?.map((address) => (
        <tr key={address.ip}>
          <td>{address.ip}</td>
          <td>{address.cidr}</td>
          <td>{address.desc}</td>
        </tr>
      ))}
    </>
  );
};

export const SubdomainSources = ({ subname }) => {
  if (!subname?.sources) {
    return <h1>Error Render SubdomainSource</h1>;
  }
  return (
    <>
      <ul>
        {subname.sources?.map((source) => (
          <li>{source}</li>
        ))}
      </ul>
    </>
  );
};

export const SubdomainList = ({ domain, opens, onClick }) => {
  if (!domain?.names) {
    return <h1>No item</h1>;
  }

  const { names } = domain;

  return names?.map((info, idx) => (
    <div className="each-sub-container">
      <i
        className={
          opens.has(info.name) ? `bi bi-caret-down-fill` : `bi bi-caret-up-fill`
        }
      />
      <a
        id={info.name}
        href={`#target-collapse-${idx}`}
        className="collapse-link"
        data-bs-toggle="collapse"
        aria-expanded="false"
        aria-controls={`target-collapse-${idx}`}
        onClick={onClick}
      >
        {info.name}
      </a>
      <div className="collapse" id={`target-collapse-${idx}`}>
        <div className="subdomain">
          <div className="left">
            <p>Name:</p>
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
          <tbody>
            <SubdomainData subname={info} />
          </tbody>
        </table>
        <div className="source">
          <p>Sources:</p>
          <SubdomainSources subname={info} />
        </div>
      </div>
    </div>
  ));
};
