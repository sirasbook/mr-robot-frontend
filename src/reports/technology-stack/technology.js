import React from "react";
import "./technology.scss"

const TechnologyStack = () => {

    const data = [
        { "Issue Trackers": ["Sentry", "Cloudflare Network Error Logging"] },
        { "Development": ["Emotion"] },
        { "Search engines": ["Algolia"] },
        { "JavaScript Frameworks": ["React", "Emotion"] },
        { "Widgets": ["Facebook"] },
        { "Tag managers": ["Google Tag Manager"] },
        { "Security": ["Cloudflare Bot Management"] },
        { "JavaScript libraries": ["core-js", "Lodash"] },
        { "Cookie compliance": ["OneTrust"] },
        { "CDN": ["Cloudflare"] },
        { "Analytics": ["Google Analytics", "Faceboo Pixel"] },
        { "Miscellaneous": ["Babel"] }
    ];

    const displayHead = data.map(
        (info) => {
            const displayBody =  Object.values(info)[0].map(
                (body) => {
                    return (
                        <tr>
                            <td>{body}</td>
                        </tr>
                    )
                }
            )

            return (
                <table class="table">
                    <thead>
                        <tr>
                           <th>{Object.keys(info)[0]}</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {displayBody}
                    </tbody>
                </table>
            )
        }
    )


    return (
        <div className="tech-container">
            <div className="left">
                <h2>Technology-stack used by the provided website</h2>
                {displayHead}
            </div>
            <div className="right">
                
            </div>
        </div>
    )
}

export default TechnologyStack;