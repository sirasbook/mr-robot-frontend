import React, { useState } from "react";
import "./technology.scss"
import tempData from "../../data/technology_data.json";

const TechnologyStack = () => {
    const [data, setData] = useState(tempData);
    let c = 0;

    const displayData = data.map(
        (info) => {
            c += 1;

            const displayBody = info.data.map(
                (body) => {
                    return (
                        <tr>
                            <td>
                                <a href={`https://www.wappalyzer.com/technologies/${info.slug}/${body.slug}`}>
                                    {body.name}
                                </a>
                            </td>
                        </tr>
                    )
                }
            )

            return (
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{info.name}</th>
                            </tr>
                        </thead>
                        <tbody id={info.name}>
                            {displayBody}
                        </tbody>
                    </table>
                </div>
            )
        }
    )

    return (
        <div className="tech-container" id="technology">
            <div className="flex-col">
                <h2>Technology-stack used by the provided website</h2>
                <div className="contain">
                    {displayData}
                </div>
            </div>
        </div>
    )
}

export default TechnologyStack;