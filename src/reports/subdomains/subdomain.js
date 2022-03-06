import React, { useState }  from "react";
import "./subdomain.scss";

const Subdomain = () => {

    var c = 0;
    var d = {}

    const data = {
        events: [
            {
                uuid: "50f79a62-b935-4ecf-9635-4769db64ab43",
                start: "02/22 07:39:30 2022 UTC",
                finish: "02/22 08:16:51 2022 UTC",
            },
        ],
        domains: [
            {
                domain: "discord.com",
                total: "34",
                names: [
                    {
                        name: "support.discord.com",
                        domain: "discord.com",
                        addresses: [
                        {
                            ip: "104.16.53.111",
                            cidr: "104.16.0.0/14",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        {
                            ip: "104.16.51.111",
                            cidr: "104.16.0.0/14",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        ],
                        tag: "api",
                        sources: [
                        "Crtsh",
                        "Yahoo",
                        "BufferOver",
                        "DuckDuckGo",
                        "CertSpotter",
                        "HyperStat",
                        "RapidDNS",
                        "Gists",
                        "Searx",
                        "AlienVault",
                        "FullHunt",
                        "AbuseIPDB",
                        "ThreatCrowd",
                        "URLScan",
                        ],
                    },
                    {
                        name: "blog.discord.com",
                        domain: "discord.com",
                        addresses: [
                        {
                            ip: "52.4.145.119",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.1.147.205",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.1.173.203",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.4.240.221",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.1.119.170",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.0.16.118",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.4.175.111",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.6.3.192",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.5.181.79",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.6.46.142",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.4.225.124",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        {
                            ip: "52.4.38.70",
                            cidr: "52.0.0.0/13",
                            asn: 14618,
                            desc: "AMAZON-AES - Amazon.com, Inc.",
                        },
                        ],
                        tag: "api",
                        sources: [
                        "Crtsh",
                        "BufferOver",
                        "DuckDuckGo",
                        "CertSpotter",
                        "SonarSearch",
                        "RapidDNS",
                        "HackerTarget",
                        "Gists",
                        "DNSDumpster",
                        "Searx",
                        "AlienVault",
                        "FullHunt",
                        "AbuseIPDB",
                        "ThreatCrowd",
                        "PKey",
                        ],
                    },
                    {
                        name: "printer.discord.com",
                        domain: "discord.com",
                        addresses: [
                        {
                            ip: "162.159.136.232",
                            cidr: "162.158.0.0/15",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        {
                            ip: "162.159.138.232",
                            cidr: "162.158.0.0/15",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        {
                            ip: "162.159.128.233",
                            cidr: "162.158.0.0/15",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        {
                            ip: "162.159.135.232",
                            cidr: "162.158.0.0/15",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        {
                            ip: "162.159.137.232",
                            cidr: "162.158.0.0/15",
                            asn: 13335,
                            desc: "CLOUDFLARENET - Cloudflare, Inc.",
                        },
                        ],
                        tag: "api",
                        sources: [
                        "BufferOver",
                        "SonarSearch",
                        "RapidDNS",
                        "HackerTarget",
                        "DNSDumpster",
                        "AlienVault",
                        "AnubisDB",
                        "FullHunt",
                        "AbuseIPDB",
                        "Maltiverse",
                        "ThreatCrowd",
                        ],
                    },
                    {
                        name: "crawl-35-237-4-214.ptr.discord.com",
                        domain: "discord.com",
                        addresses: [
                            {
                                ip: "35.237.4.214",
                                cidr: "35.237.4.0/24",
                                desc: "Unknown"
                            }
                        ],
                        tag: "dns",
                        sources: [
                            "BufferOver",
                            "RapidDNS",
                            "HackerTarget",
                            "DNSDumpster",
                            "AnubisDB",
                            "FullHunt"
                        ]
                    },
                ],
            },
        ],
    };

    const displaySubdomain = data.domains[0].names.map(
        (info) => {
            c += 1;
            var target = "target" + c;
            var targetId = "#" + target;

            if (info.tag in d) {
                d[`${info.tag}`] += 1;
            }else {
                d[`${info.tag}`] = 1;
            }

            const displayData = info.addresses.map(
                (address) => {
                    return (
                        <tr>
                            <td>{address.ip}</td>
                            <td>{address.cidr}</td>
                            <td>{address.desc}</td>
                        </tr>
                    )
                }
            )

            const displaySource = info.sources.map(
                (source) => {
                    return (
                        <ul>
                            <li>{source}</li>
                        </ul>
                    )
                }
            )

            return (
                <div className="each-sub-container">
                    <i class="bi bi-caret-down-fill"></i>
                    <a className="collapse-link" data-bs-toggle="collapse" href={targetId} aria-expanded="false" aria-controls={target}>
                        {info.name}
                    </a>
                    <div class="collapse" id={target}>
                        <div className="subdomain">
                            <div className="left">
                                <p><a>Name:</a></p>
                                <p>Domain:</p>
                                <p>Tag:</p>
                                {info.addresses[0].asn !== undefined ? <p>ASN:</p> : null}
                            </div>
                            <div className="right">
                                <p><a href={info.name}>{info.name}</a></p>
                                <p>{info.domain}</p>
                                <p>{info.tag}</p>
                                {info.addresses[0].asn !== undefined ? <p>{info.addresses[0].asn}</p> : null}
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
                            <tbody>
                                {displayData}
                            </tbody>
                        </table>
                        <div className="source">
                            <p>Sources:</p>
                            {displaySource}
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className="subdomain-container">
            <h2>Found Subdomains</h2>
            <p className="total">{data.domains[0].total} names discovered</p>
            {displaySubdomain}
        </div>
    )
};

export default Subdomain;
