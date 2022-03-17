import React, { useState } from "react";
import "./port.scss"
import tempData from "../../data/port.json";

const Port = () => {

    const [data, setData] = useState(tempData);

    const displayBody = data.nmaprun.host.ports.port.map(
        (info) => {
            return (
                <tr>
                    <td>{info["-portid"]}</td>
                    <td>{info["-protocol"]}</td>
                    <td>{info.state["-state"]}</td>
                    <td>{info.service["-name"]}</td>
                </tr>
            )
        }
    )

    return (
        <div className="port-container">
            <h2>Port founded</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Port</th>
                        <th>Protocol</th> 
                        <th>State</th>
                        <th>Service</th>
                    </tr>
                </thead>
                <tbody>
                    {displayBody}
                </tbody>
            </table>
        </div>
    )
}

export default Port;