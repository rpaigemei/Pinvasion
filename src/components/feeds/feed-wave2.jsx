import React, { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import Pin from "../pin";

const PEXEL_KEY = import.meta.env.VITE_PEXELS_KEY;

const fetchPins = async (count = 10) => {
  try {
    const queries = ["nature", "city", "technology", "abstract", "food"];
    const query = queries[Math.floor(Math.random() * queries.length)];
    const page = Math.floor(Math.random() * 50) + 1;

    const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=${count}&page=${page}`,
        {
            headers: {
                Authorization: PEXEL_KEY
            }
        }
    );

    const data = await res.json();
    
    const pins = data.photos.map(photo => ({
        id: `${photo.id}-${crypto.randomUUID()}`,
        image: photo.src.large,
        alt: photo.alt || "Pexels image",
        author: photo.photographer,
        type: Math.random() < 0.4 ? "ad" : "normal",
        removed: false,
    }));

    return pins;
  }
  catch (err) {
    console.error("Error fetching Pexels images:", err);
    
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
            const initialPins = await fetchPins(60);
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

        const scrollSpeed = 2.75;
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