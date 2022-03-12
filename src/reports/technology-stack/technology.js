import React, { useState } from "react";
import "./technology.scss"

const TechnologyStack = () => {

    const tableHead = new Set();

    const data = {
        urls: {
            "https://classdeedee.cloud.cp.eng.chula.ac.th/": {
                status: 200,
            },
        },
        technologies: [
            {
                slug: "node-js",
                name: "Node.js",
                confidence: 100,
                version: null,
                icon: "node.js.png",
                website: "http://nodejs.org",
                cpe: "cpe:/a:nodejs:node.js",
                categories: [
                    {
                        id: 27,
                        slug: "programming-languages",
                        name: "Programming languages",
                    },
                ],
            },
            {
                slug: "ant-design",
                name: "Ant Design",
                confidence: 100,
                version: null,
                icon: "Ant Design.svg",
                website: "https://ant.design",
                cpe: null,
                categories: [
                    {
                        id: 66,
                        slug: "ui-frameworks",
                        name: "UI frameworks",
                    },
                ],
            },
            {
                slug: "nginx",
                name: "Nginx",
                confidence: 100,
                version: null,
                icon: "Nginx.svg",
                website: "http://nginx.org/en",
                cpe: "cpe:/a:nginx:nginx",
                categories: [
                    {
                        id: 22,
                        slug: "web-servers",
                        name: "Web servers",
                    },
                    {
                        id: 64,
                        slug: "reverse-proxies",
                        name: "Reverse proxies",
                    },
                ],
            },
            {
                slug: "react",
                name: "React",
                confidence: 100,
                version: null,
                icon: "React.png",
                website: "https://reactjs.org",
                cpe: "cpe:/a:facebook:react",
                categories: [
                    {
                        id: 12,
                        slug: "javascript-frameworks",
                        name: "JavaScript frameworks",
                    },
                ],
            },
            {
                slug: "openresty",
                name: "OpenResty",
                confidence: 100,
                version: "1.15.8.1",
                icon: "OpenResty.png",
                website: "http://openresty.org",
                cpe: null,
                categories: [
                    {
                        id: 22,
                        slug: "web-servers",
                        name: "Web servers",
                    },
                ],
            },
            {
                slug: "next-js",
                name: "Next.js",
                confidence: 100,
                version: null,
                icon: "vercel.svg",
                website: "https://nextjs.org",
                cpe: "cpe:/a:zeit:next.js",
                categories: [
                    {
                        id: 18,
                        slug: "web-frameworks",
                        name: "Web frameworks",
                    },
                    {
                        id: 22,
                        slug: "web-servers",
                        name: "Web servers",
                    },
                ],
            },
            {
                slug: "webpack",
                name: "webpack",
                confidence: 100,
                version: null,
                icon: "webpack.svg",
                website: "https://webpack.js.org/",
                cpe: null,
                    categories: [
                        {
                            id: 19,
                            slug: "miscellaneous",
                            name: "Miscellaneous",
                        },
                    ],
            },
        ],
    };

    const displayData = data.technologies.map(
        (info) => {

            const displayBody = info.categories.map(
                (body) => {
                    if (document.getElementById(`${body.name}`) !== null) {
                        var tableRef = document.getElementById(`${body.name}`)
                        tableRef.insertRow().innerHTML = 
                        "<td>" + `${info.name}` + "</td>"
                    }
                }
            )

            const displayHead =  info.categories.map(
                (body) => {
                    if (tableHead.has(body.name) === false) {
                        tableHead.add(body.name)
                        return (
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>{body.name}</td>
                                    </tr>
                                </thead>
                                <tbody id={body.name}>
                                    {displayBody}
                                </tbody>
                            </table>
                        )
                    }
                }
            )

            return (
                <div>
                    {displayHead}
                </div>
            )
        }
    )

    return (
        <div className="tech-container" id="technology">
            <div className="left">
                <h2>Technology-stack used by the provided website</h2>
                {displayData}
            </div>
        </div>
    )
}

export default TechnologyStack;