import React from "react";

import { IoHeart } from "react-icons/io5";

function HealthBar({ progress }) {
    return (
        <div className="health-bar">
            <div className="icon">
                <IoHeart size={25}/>
            </div>
            
            <div className="progress-bar">
                <div className={`progress ${progress === 0 ? 'end' : ''}`} style={{ width: `${progress}%`}}>
                    {progress !== 0 && `${progress}%`}
                </div>
            </div>
        </div>
    )
}

export default HealthBar;