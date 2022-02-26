import React from "react";
import "./leaked.scss"

const Leaked = () => {

    const data = {
        message: "Directories / Files found by fuzzing",
        total: 16,
        data: [
            {
                url: "https://www.reg.chula.ac.th/download",
                "content_type": "text/html;charset=UTF-8",
            },
            {
                url: "https://www.reg.chula.ac.th/icons/README",
                "content_type": "",
            },
            {
                url: "https://www.reg.chula.ac.th/images",
                "content_type": "text/html;charset=UTF-8",
            },
            {
                url: "https://www.reg.chula.ac.th/index.html",
                "content_type": "text/html",
            },
            {
                url: "https://www.reg.chula.ac.th/includes/",
                "content_type": "text/html;charset=UTF-8",
            },
            {
                url: "https://www.reg.chula.ac.th/includes",
                "content_type": "text/html;charset=UTF-8",
            },
        ],
    };

    var c = 0;

    const displayBody = data.data.map(
        (info) => {
            console.log(info.url)
            c += 1
            return (
                <tr>
                    <td className="no">{c}</td>
                    <td>{info.url}</td>
                    {info.content_type === "" ? <td>N/A</td> : <td>{info.content_type}</td>}
                </tr>
            )
        }
    )

    return (
        <div className="leaked-container">
            <h2>Leaked directories and files</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th className="no">No.</th>
                        <th>Directory / File</th> 
                        <th>Content Type</th> 
                    </tr>
                </thead>
                <tbody>
                    {displayBody}
                </tbody>
            </table>
        </div>
    )
}

export default Leaked;