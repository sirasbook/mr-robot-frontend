import React from "react";
import logo from "../logo.png";
import "./header.css"

const Header = () => {
    return (
        <div className="header">
            <img src={logo} class="rounded float-start" alt="logo"/>
            <label>MR. Robot</label>
        </div>
    )
}

export default Header;