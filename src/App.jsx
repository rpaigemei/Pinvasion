import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/sidebar'
import HealthBar from './components/health';
import Time from './components/time';
import PausedOverlay from './components/overlays/paused';
import StartOverlay from './components/overlays/start';
import CountdownOverlay from './components/overlays/countdown';
import WaveEndOverlay from './components/overlays/waveEnd';
import GameEndOverlay from './components/overlays/gameEnd';
import Feed1 from './components/feeds/feed-wave1';
import Feed2 from './components/feeds/feed-wave2';
import Feed3 from './components/feeds/feed-wave3';

import { FaCircleInfo } from "react-icons/fa6";

function App() {
    const [feedResetKey, setFeedResetKey] = useState(0);

    const [adsPassed, setAdsPassed] = useState(0);
    const [misclicks, setMisclicks] = useState(0);
    const [adClicks, setAdClicks] = useState(0);

    const [stats, setStats] = useState([]);

    const [health, setHealth] = useState(100);

    useEffect(() => {
        if (adsPassed === 0) {
            return;
        }

        setHealth(prev => Math.max(prev - 5, 0));
    }, [adsPassed]);

    useEffect(() => {
        if (misclicks === 0) {
            return;
        }

        setHealth(prev => Math.max(prev - 10, 0));
    }, [misclicks]);

    useEffect(() => {
        if (adClicks === 0) {
            return;
        }

        setHealth(prev => Math.min(prev + 2, 100));
    }, [adClicks]);

    const totalTime = 100;

    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [paused, setPaused] = useState(true);

    const pausedRef = useRef(paused);

    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!pausedRef.current) {
                    setTimeLeft(prev => {
                        if (prev <= 0) {
                            clearInterval(timer);
                            return 0;
                        }

                    return prev - 1;
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const time = ((totalTime - timeLeft) / totalTime) * 100;

    const togglePause = () => {
        setPaused(prev => !prev);
    }

    const [gameStarted, setGameStarted] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleStartPress = () => {
        setGameStarted(true);
        setCountdown(3);
        setPaused(true);
    }

    useEffect(() => {
        if (countdown <= 0) {
            return;
        }

        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);

                    setPaused(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown]);

    const [wave, setWave] = useState(1);
    const [waveEnded, setWaveEnded] = useState(false);

    const [gameEnded, setGameEnded] = useState(false);
    const [lost, setLost] = useState(false);

    useEffect(() => {
        if (health > 0 && timeLeft === 0 && !waveEnded && !gameEnded) {
            const waveStat = {
                wave,
                adsPassedTotal: adsPassed,
                misclicksTotal: misclicks,
                adsClickedTotal: adClicks,
            }

            setStats(prev => [...prev, waveStat]);
            
            if (wave === 3) {
                setGameEnded(true);
                setPaused(true);

                return;
            }

            setWaveEnded(true);
            setPaused(true);
        }
    }, [timeLeft]);

    const handleNextPress = () => {
        setCountdown(3);
        setPaused(true);
        
        setWave(prev => prev + 1);
        setWaveEnded(false);

        setTimeLeft(totalTime);
        
        setAdsPassed(0);
        setMisclicks(0);
        setAdClicks(0);

        setFeedResetKey(prev => prev + 1);
    }

    useEffect(() => {
        if (health === 0) {
            const waveStat = {
                wave,
                adsPassedTotal: adsPassed,
                misclicksTotal: misclicks,
                adsClickedTotal: adClicks,
            }

            setStats(prev => [...prev, waveStat]);

            setGameEnded(true);
            setPaused(true);
            setLost(true);
        }
    }, [health]);

    useEffect(() => {
        console.log("Stats updated:", stats);
    }, [stats]);

    const handleReplayPress = () => {
        setCountdown(3);
        setPaused(true);
        
        setWave(1);

        setGameEnded(false);

        setTimeLeft(totalTime);
        setHealth(100);
        
        setAdsPassed(0);
        setMisclicks(0);
        setAdClicks(0);

        setStats([]);

        setFeedResetKey(prev => prev + 1);
    }

    return (
        <div className='pinvasion'>
            {!gameStarted && (
                <StartOverlay handleStartPress={handleStartPress} />
            )}

            {gameStarted && countdown > 0 && !waveEnded && !gameEnded && (
                <CountdownOverlay number={countdown} wave={wave}/>
            )}

            {waveEnded && (
                <WaveEndOverlay wave={wave} handleNextPress={handleNextPress} stats={stats} />
            )}

            {gameEnded && (
                <GameEndOverlay handleReplayPress={handleReplayPress} lost={lost} stats={stats} />
            )}

            <Sidebar togglePause={togglePause} paused={paused} wave={wave} />

            <div className='body'>
                {gameStarted && countdown === 0 && paused && !waveEnded && !gameEnded && (
                    <PausedOverlay />
                )}

                <div className='content'>
                    <div className='instruction-bar'>
                        <FaCircleInfo />
                        Three waves of ads are flooding in. Click carefully and keep your feed alive!
                    </div>

                    <HealthBar progress={health} />

                    <div className='game'>
                        {wave === 1 && (
                            <Feed1 key={feedResetKey} feedResetKey={feedResetKey} startScrolling={gameStarted && countdown === 0 && !paused } setAdsPassed={setAdsPassed} setMisclicks={setMisclicks} setAdClicks={setAdClicks} />
                        )}

                        {wave === 2 && (
                            <Feed2 startScrolling={gameStarted && countdown === 0 && !paused } setAdsPassed={setAdsPassed} setMisclicks={setMisclicks} setAdClicks={setAdClicks} />
                        )}

                        {wave === 3 && (
                            <Feed3 startScrolling={gameStarted && countdown === 0 && !paused } setAdsPassed={setAdsPassed} setMisclicks={setMisclicks} setAdClicks={setAdClicks} />
                        )}

                        <Time time={time} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
