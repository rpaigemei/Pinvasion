import React, { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import Pin from "../pin";

const fetchPins = async (count = 10) => {
  try {
    const ratios = [
        {w: 1000, h: 1000},
        {w: 1600, h: 900},
        {w: 1600, h: 2000},
        {w: 1200, h: 800},
        {w: 900, h: 1600},
        {w: 1200, h: 800},
        {w: 1600, h: 1000},
    ]

    const randomRatio = () => {
        return ratios[Math.floor(Math.random() * ratios.length)];
    };

    const pins = Array.from({ length: count }).map(() => {
        const { w, h } = randomRatio();

        return {
            id: crypto.randomUUID(),
            image: `https://picsum.photos/${w}/${h}?random=${Math.random()}`,
            alt: "Lorem Picsum image",
            type: Math.random() < 0.4 ? "ad" : "normal",
            removed: false,
        };
    });

    return pins;
  }
  catch (err) {
    console.error("Error fetching Picsum images:", err);
    
    return [];
  }
};

function Feed2({ startScrolling, setAdsPassed, setMisclicks, setAdClicks }) {
    const [pins, setPins] = useState([]);

    const adIdsSeen = useRef(new Set());

    const handleAdPassed = (id) => {
        if(!adIdsSeen.current.has(id)) {
            adIdsSeen.current.add(id);

            setAdsPassed(prev => prev + 1);
        }
    }

    useEffect(() => {
        const preload = async () => {
            const initialPins = await fetchPins(100);
            setPins(initialPins);
        };

        preload();
    }, []);

    useEffect(() => {
        if (!startScrolling) {
            return
        };

        const interval = setInterval(async () => {
            const newPins = await fetchPins(5);
            setPins((prev) => [...prev, ...newPins]);
        }, 2000);

        return () => clearInterval(interval);
    }, [startScrolling]);

    const feedRef = useRef(null);

    useEffect(() => {
        if (!startScrolling) {
            return;
        }

        const scrollSpeed = 3;
        let animationFrame;

        const step = () => {
            if (feedRef.current) {
                feedRef.current.scrollTop += scrollSpeed;
            }

            animationFrame = requestAnimationFrame(step);
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [startScrolling])

    const handlePinClick = (pinId) => {
        const clickedPin = pins.find(p => p.id === pinId);

        if (clickedPin.type === "normal") {
            setMisclicks(prev => prev + 1);
        }
        else if (clickedPin.type === "ad") {
            setAdClicks(prev => prev + 1);
        }

        setPins(prevPins =>
            prevPins.map(pin =>
                pin.id === pinId ? { ...pin, removing: true} : pin
            )
        );

        setTimeout(() => {
            setPins(prevPins =>
                prevPins.map(pin =>
                    pin.id === pinId ? { ...pin, removed: true} : pin
                )
            );
        }, 400);
    }

    return (
        <div className="feed" ref={feedRef}>
            <Masonry
                breakpointCols={4}
                className="grid"
                columnClassName="column"
            >
                {pins.map((pin) => (
                    <Pin pin={pin} key={pin.id} onPassed={handleAdPassed} onClick={handlePinClick} />
                ))}
            </Masonry>
        </div>
    )
}

export default Feed2;