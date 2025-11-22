import React from "react";

function GameEndOverlay({ handleReplayPress, lost, stats }) { 
    let adsPassedTotal = 0;
    let adsClickedTotal = 0;
    let misclicksTotal = 0;

    stats.forEach(stat => {
        adsPassedTotal += stat.adsPassedTotal;
        adsClickedTotal += stat.adsClickedTotal;
        misclicksTotal += stat.misclicksTotal;
    });

    return (
        <div className="overlay">
            <div className="pop-up">
                <div className="end-game">
                    {lost ? <div className="message">
                        <div className="state">
                            You Lost.
                        </div>
                        <div className="description">
                            Your feed has been overwhelmed by ads.
                        </div>
                    </div> : <div className="message">
                        <div className="state">
                            Victory!
                        </div>
                        <div className="description">
                            You restored authenticity to the feed.
                        </div>
                    </div>}

                    <div className="stats">
                        <div className="heading">
                            Overall Totals
                        </div>
                        <div className="stat">
                            <div className="label">
                                Misclicks
                            </div>
                            <div className="number">
                                {misclicksTotal}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="label">
                                Ads Passed
                            </div>
                            <div className="number">
                                {adsPassedTotal}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="label">
                                Ads Clicked
                            </div>
                            <div className="number">
                                {adsClickedTotal}
                            </div>
                        </div>
                    </div>

                    <div className="button" onClick={handleReplayPress}>
                        Replay
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameEndOverlay;