import React from "react";
import "./port.scss";
import { ClipLoader } from "react-spinners";

import psl from "psl";
import { useNmapData } from "../../hook/useNmapData";
import { useEnumData } from "../../hook/useEnumData";

const NmapResultItem = ({ target }) => {
  return (
    <>
      <li>{target["@specification"]}</li>
    </>
  );
};

const Port = () => {
  const url = sessionStorage.getItem("url")?.replace(/^http[s]?:\/\//, "");
  const { domain } = psl.parse(url);

  const [{ data: enumData }] = useEnumData(domain, { enabled: false });
  const urls = [
    ...new Set([
      ...(enumData?.data.domains[0].names.map((item) => item.name) || []),
      url,
    ]),
  ];
  const nmapData = useNmapData(urls);

  return (
    <>
      <div className="port-container" id="port">
        <h2>Port Testing</h2>
        <ul>
          {nmapData?.map(({ data, isLoading, isFetching, isError }) => {
            return (
              <>
                {isLoading || isFetching ? (
                  <p>
                    Scaning <ClipLoader />
                  </p>
                ) : (
                  !isError &&
                  data && (
                    <NmapResultItem
                      key={data?.data.nmaprun.target["@specification"]}
                      target={data?.data.nmaprun.target}
                    />
                  )
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );

  //   const displayBody = data.nmaprun.host.ports.port.map((info) => {
  //     return (
  //       <tr>
  //         <td>{info["-portid"]}</td>
  //         <td>{info["-protocol"]}</td>
  //         <td>{info.state["-state"]}</td>
  //         <td>{info.service["-name"]}</td>
  //       </tr>
  //     );
  //   });

  //   return (
  //     <div className="port-container" id="port">
  //       <h2>Port founded</h2>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>Port</th>
  //             <th>Protocol</th>
  //             <th>State</th>
  //             <th>Service</th>
  //           </tr>
  //         </thead>
  //         <tbody>{displayBody}</tbody>
  //       </table>
  //     </div>
  //   );
};

export default Port;
