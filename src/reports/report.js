import React from "react";
import TechnologyStack from "./technology-stack/technology";
import "./report.scss"
import Leaked from "./leaked-directories/leaked";
import Alert from "./alerts-found/alert";
import Subdomain from "./subdomains/subdomain";
import Port from "./port/port";

const Report = () => {
    return (
        <div className="report-container">
            <div className="summary-container">
                <h1>Summary of Scanning Result</h1>
                <h2>Domain: {sessionStorage.getItem('url')}</h2>
                <h2>This summary include:</h2>
                <li><a href="#port">Port founded</a></li>
                <li><a href="#technology">Technology-stack</a></li>
                <li><a href="#subdomain">Subdomains</a></li>
                <li><a href="#leaked-dir">Leaked directory</a></li>
                <li><a href="#alert">Alert founded</a></li>
                {/* <h2 id="summary">Summary</h2> */}
            </div>
            <Port/>
            <TechnologyStack/>
            <Subdomain/>
            <Leaked/>
            <Alert/>
        </div>
    )
}

export default Report;