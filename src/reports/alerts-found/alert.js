import React from "react";
import "./alert.scss";

const Alert = () => {

    const data = {
        alerts: [
            {
                alert_no: 1,
                name: "Application Error Disclosure",
                risk: "Medium (Medium)",
                description:
                "<p>This page contains an error/warning message that may disclose sensitive information like the location of the file that produced the unhandled exception. This information can be used to launch further attacks against the web application. The alert could be a false positive if the error message is found inside a documentation page.</p>",
                instances: [
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th/_next/static/chunks/pages/_error-a33892d286e78bfa334d.js",
                    method: "GET",
                    param: "",
                    attack: "",
                    evidence: "Internal Server Error",
                },
                ],
                count: "1",
                solutions:
                "<p>Review the source code of this page. Implement custom error pages. Consider implementing a mechanism to provide a unique error reference/identifier to the client (browser) while logging the details on the server side and not exposing them to the user.</p>",
                reference: "",
                cweid: "200",
                refid: "90022",
            },
            {
                alert_no: 2,
                name: "Content Security Policy (CSP) Header Not Set",
                risk: "Medium (High)",
                description:
                "<p>Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.</p>",
                instances: [
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th",
                    method: "GET",
                    param: "",
                    attack: "",
                    evidence: "",
                },
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th/",
                    method: "GET",
                    param: "",
                    attack: "",
                    evidence: "",
                },
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th/robots.txt",
                    method: "GET",
                    param: "",
                    attack: "",
                    evidence: "",
                },
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th/sitemap.xml",
                    method: "GET",
                    param: "",
                    attack: "",
                    evidence: "",
                },
                ],
                count: "4",
                solutions:
                '<p>Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header, to achieve optimal browser support: "Content-Security-Policy" for Chrome 25+, Firefox 23+ and Safari 7+, "X-Content-Security-Policy" for Firefox 4.0+ and Internet Explorer 10+, and "X-WebKit-CSP" for Chrome 14+ and Safari 6+.</p>',
                reference:
                "<p>https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy</p><p>https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html</p><p>http://www.w3.org/TR/CSP/</p><p>http://w3c.github.io/webappsec/specs/content-security-policy/csp-specification.dev.html</p><p>http://www.html5rocks.com/en/tutorials/security/content-security-policy/</p><p>http://caniuse.com/#feat=contentsecuritypolicy</p><p>http://content-security-policy.com/</p>",
                cweid: "693",
                refid: "10038",
            },
            {
                alert_no: 3,
                name: "Missing Anti-clickjacking Header",
                risk: "Medium (Medium)",
                description:
                "<p>The response does not include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options to protect against 'ClickJacking' attacks.</p>",
                instances: [
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th",
                    method: "GET",
                    param: "X-Frame-Options",
                    attack: "",
                    evidence: "",
                },
                {
                    uri: "https://classdeedee.cloud.cp.eng.chula.ac.th/",
                    method: "GET",
                    param: "X-Frame-Options",
                    attack: "",
                    evidence: "",
                },
                ],
                count: "2",
                solutions:
                "<p>Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.</p><p>If you expect the page to be framed only by pages on your server (e.g. it's part of a FRAMESET) then you'll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy's \"frame-ancestors\" directive.</p>",
                reference:
                "<p>https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options</p>",
                cweid: "1021",
                refid: "10020",
            },
        ],
    };

    const displayAlertSummary = data.alerts.map(
        (info) => {
            return (
                <tr>
                    <td className="center">{info.refid}</td>
                    <td>{info.name}</td>
                    <td>{info.risk.split('(')[0]}</td>
                    <td className="count">{info.count}</td>
                </tr>
            )
        }
    )

    const displayAlertDetail = data.alerts.map(
        (info) => {
            const displayURL =  info.instances.map(
                (instance) => {
                    console.log(instance)
                    return (
                        <tbody>
                            <tr>
                                <td className="left">URL</td>
                                <td>{instance.uri}</td>
                            </tr>
                            <tr>
                                <td className="left-sub">Method</td>
                                <td className="sub">{instance.method}</td>
                            </tr>
                            <tr>
                                <td className="left-sub">Parameter</td>
                                <td className="sub">{instance.param}</td>
                            </tr>
                            <tr>
                                <td className="left-sub">Attack</td>
                                <td className="sub">{instance.attack}</td>
                            </tr>
                            <tr>
                                <td className="left-sub">Evidence</td>
                                <td className="sub">{instance.evidence}</td>
                            </tr>
                        </tbody>
                    )
                }
            )

            return (
                <table class="table table-detail">
                    <thead>
                        <tr>
                           <th className="risk">{info.risk.split('(')[0]} Risk</th>
                           <th>{info.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left">Description</td>
                            <td>{info.description.replace( /(<([^>]+)>)/ig, '\n')}</td>
                        </tr>
                        <tr>
                            <td className="left">Solution</td>
                            <td>{info.solutions.replace( /(<([^>]+)>)/ig, '\n')}</td>
                        </tr>
                    </tbody>
                    {displayURL}
                    <tbody>
                        <tr>
                            <td className="left">Reference</td>
                            <td>{info.reference.replace( /(<([^>]+)>)/ig, '\n')}</td>
                        </tr>
                        <tr>
                            <td className="left">CWE ID</td>
                            <td>{info.cweid}</td>
                        </tr>
                        <tr>
                            <td className="left">Reference ID</td>
                            <td>{info.refid}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    )

    return (
        <div className="alert-container" id="alert">
            <h2>Alert summary</h2>
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th className="center">Reference ID</th>
                        <th>Alert Type</th> 
                        <th>Risk Level</th>
                        <th className="count">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAlertSummary}
                    <tr>
                        <td className="total">Total</td>
                        <td className="total"></td>
                        <td className="total"></td>
                        <td className="total"></td>
                    </tr>
                </tbody>
            </table>
            <h2 style={{paddingTop: "30px"}}>Alert Details</h2>
            {displayAlertDetail}
        </div>
    )
}

export default Alert;