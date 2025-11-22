import React from "react";
import { AiFillPushpin } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import logo from "../../assets/pinvasion.png";

function StartOverlay({ handleStartPress }) {
    const instructions = [
        {
            instruction: "Pins will scroll down the screen automatically.",
            description: "New pins will appear from the bottom and scroll up like a real feed.",
        },
        {
            instruction: "Click on ads to remove them.",
            description: "Each ad you clear helps protect your feed’s health.",
        },
        {
            instruction: "Do NOT click real posts.",
            description: "Let authentic pins scroll by untouched. Mis-clicking them will harm your feed.",
        },
        {
            instruction: "Watch your feed’s health meter.",
            description: "If too many ads scroll by or you remove too many real posts, your feed will become overwhelmed.",
        },
    ];

    return (
        <div className="overlay">
            <div className="pop-up">
                <div className="introduction">
                    <img src={logo} className="logo"/>

                    <div className="title">
                        <div className="welcome">
                            Welcome to
                        </div>
                        <div className="name">
                            Pinvasion
                        </div>
                    </div>
                    <div className="goal">
                        Three waves of ads are flooding in. Click carefully and keep your feed alive!
                    </div>
                    <div className="instructions">
                        <div className="label">
                            How to Play
                        </div>
                        <div className="list">
                            {instructions.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="bullet">
                                            <AiFillPushpin size={20} className="dot" />
                                            {item.instruction}
                                        </div>
                                        <div className="description">
                                            {item.description}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="button" onClick={handleStartPress}>
                        START
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartOverlay;