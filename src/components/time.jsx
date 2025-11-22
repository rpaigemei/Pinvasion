import React from "react";

import { FaCircle } from "react-icons/fa";

function Time({ time }) {
    return (
        <div className="time-bar">
            <div className="time" style={{ height: `${time}%`}} />
            
            <FaCircle size={15} className="dot"/>
        </div>
    )
}

export default Time;