import React from "react";

function CountdownOverlay({ number, wave }) {
    return (
        <div className="overlay">
            <div className="pop-up">
                <div className="countdown">
                    <div className="wave">
                        Wave {wave} starts in...
                    </div>

                    <div className="number">
                        {number}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountdownOverlay;