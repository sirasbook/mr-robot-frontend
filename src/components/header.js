import React from "react";
import logo from "../logo.png";
import "./header.scss"

const Header = () => {
    return (
        <div className="header">
            <img src={logo} class="rounded float-start" alt="logo"/>
                <label className="name">MR. Robot</label>
                <label className="desc">- All in One tool for web-scanning</label>
        </div>
    )
}

export default Header;