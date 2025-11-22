import React from "react";

import logo from "../assets/pinvasion.png";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi";
import { FaCircle } from "react-icons/fa";

function Sidebar({ togglePause, paused, wave }) {
    return (
        <div className="sidebar">
            <div className="icon">
                <img src={logo} className="logo"/>
            </div>
            
            <div className="waves">
                <FaCircle size={10} id={wave >= 1 ? "completed" : "uncompleted"}/>
                <FaCircle size={10} id={wave >= 2 ? "completed" : "uncompleted"}/>
                <FaCircle size={10} id={wave === 3 ? "completed" : "uncompleted"}/>
            </div>

            <div className="icon" onClick={togglePause}>
                {paused ? <HiOutlinePlay size={25} /> : <HiOutlinePause size={25} />}
            </div>
        </div>
    )
}

export default Sidebar;