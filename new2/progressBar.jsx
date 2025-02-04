import { useState, useEffect, useRef } from 'react';

export default function App() {
    const [list, setList] = useState([]);

    const handleClick = () => {
        setList(prev => {
            const newObj = {
                id: Date.now(),
                progress: 0
            };
            return [...prev, newObj];
        });
    };

    return (
        <div>
            <button onClick={handleClick}>Add</button>
            {list.map((val, index) => (
                <div key={val.id}>
                    <AnimatedProgress data={val} />
                </div>
            ))}
        </div>
    );
}

const AnimatedProgress = ({ data }) => {
    const [progress, setProgress] = useState(0);
    const animationFrameId = useRef();

    useEffect(() => {
        const start = performance.now();
        const duration = 2000; // 2 seconds

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrameId.current = requestAnimationFrame(animate);
            }
        };


        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <div className="progress-bar">
            <div
                className="progress"
                style={{
                    width: `${progress}%`,
                    transition: 'width 10ms linear',
                }}
            ></div>
        </div>
    );
};

        body {
    font - family: sans - serif;
}



.progress - bar {
    width: 100 %;
    height: 20px;
    background - color: #e0e0e0;
    border - radius: 10px;
    overflow: hidden;
    margin - bottom: 10px;
}

.progress {
    height: 100 %;
    width: 0 %;
    background - color: #76c7c0;
    border - radius: 10px;
}