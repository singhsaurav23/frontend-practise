// Dark.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const useDarkMode = () => {
    const [isDark, setDark] = useState(() => {
        return localStorage.getItem('darkmode') === 'enabled';
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('darkmode', 'enabled')
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkmode', 'disabled')
        }
    }, [isDark]);

    return [isDark, setDark];
}

// Use default export
export default function Dark() {
    const [isDark, setDark] = useDarkMode();

    return (
        <div className='w-full'>
            <button onClick={() => setDark(prev => !prev)}>
                {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to='/'>Back</Link>
        </div>
    );
}