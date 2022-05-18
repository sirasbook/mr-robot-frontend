import React from "react";

export const Summary = ({ summary }) => {
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
