import React, { useEffect, useRef, useState } from "react";

import { HiEllipsisHorizontal } from "react-icons/hi2";

function Pin({ pin, onPassed, onClick }) {
    const pinRef = useRef();
    const countedRef = useRef(false);
    const animationRef = useRef();
    const countY = 0;

    useEffect (() => {
        if (pin.type !== "ad" || pin.removed) {
            return;
        }

        const checkPosition = () => {
            if (!pinRef.current || countedRef.current || pin.removed) {
                return;
            }

            const rect = pinRef.current.getBoundingClientRect();

            if (rect.bottom <= countY) {
                countedRef.current = true;
                onPassed?.(pin.id);
            }
            else {
                animationRef.current = requestAnimationFrame(checkPosition);
            }
        };

        animationRef.current = requestAnimationFrame(checkPosition);

        return () => cancelAnimationFrame(animationRef.current);
    }, [pin.id, pin.type, pin.removed, onPassed, countY]);
        
    return (
        <div className={`pin ${pin.removing ? 'removing' : ''}`} ref={pinRef} onClick={() => onClick(pin.id)}>
            <img
                src={pin.image}
                alt={pin.alt || "Pexels image"}
                loading="lazy"
                className="image"
                draggable="false"
            />

            {pin.type === "ad" ? <div className="ad">
                <div className="tag">
                    Sponsored
                </div>
                
                <HiEllipsisHorizontal size={20} className="more"/>
            </div> : <div className="normal">
                <HiEllipsisHorizontal size={20} className="more"/>
            </div>}
            
        </div>
    )
}

export default Pin;