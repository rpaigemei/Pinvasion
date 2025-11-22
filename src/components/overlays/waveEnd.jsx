import React from "react";

function WaveEndOverlay({ wave, handleNextPress, stats }) {
    return (
        <div className="overlay">
            <div className="pop-up">
                <div className="end-wave">
                    <div className="wave">
                        Wave {wave} Cleared.
                    </div>

                    {stats.map((stat) => 
                        stat.wave === wave && (
                            <div key={stat.wave} className="stats">
                                <div className="heading">
                                    Wave Totals
                                </div>

                                <div className="stat">
                                    <div className="label">
                                        Ads Passed
                                    </div>
                                    <div className="number">
                                        {stat.adsPassedTotal}
                                    </div>
                                    
                                </div>
                                <div className="stat">
                                    <div className="label">
                                        Ads Clicked
                                    </div>
                                    <div className="number">
                                        {stat.adsClickedTotal}
                                    </div>
                                    
                                </div>
                                <div className="stat">
                                    <div className="label">
                                        Misclicks
                                    </div>
                                    <div className="number">
                                        {stat.misclicksTotal}
                                    </div>
                                    
                                </div>
                            </div>
                    ))}

                    <div className="button" onClick={handleNextPress}>
                        Start Next Wave
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaveEndOverlay;