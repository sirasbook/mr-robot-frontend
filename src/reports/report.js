import React from "react";
import TechnologyStack from "./technology-stack/technology";
import "./report.scss"
import Leaked from "./leaked-directories/leaked";
import Alert from "./alerts-found/alert";
import Subdomain from "./subdomains/subdomain";

const Report = () => {
    return (
        <div className="report-container">
            <div className="summary-container">
                <h1>Summary of Scanning Result</h1>
                <h2>Domain: {sessionStorage.getItem('url')}</h2>
                <h2>This summary include:</h2>
                <li><a href="">Summary</a></li>
                <li><a href="">Technology-stack</a></li>
                <li><a href="">Subdomains</a></li>
                <li><a href="">Leaked directory</a></li>
                <li><a href="">Alert founded</a></li>
                <h2>Summary</h2>
            </div>
            <TechnologyStack/>
            <Subdomain/>
            <Leaked/>
            <Alert/>
        </div>
    )
}

export default Report;