import { useState, useEffect, useCallback, memo, useMemo, useRef, Suspense, lazy } from 'react';
import { Card } from './Card';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Dark = lazy(() => import('./Dark'));



const data = [
    {
        "name": "Item 1",
        "description": "A high-quality pro"
    },
    {
        "name": "Item 2",
        "description": "An innovative solut"
    },
    {
        "name": "Item 3",
        "description": "Durable and reliable, built to last."
    },
    {
        "name": "Item 4",
        "description": "Eco-friendly and sustainable, perfect for the environment."
    },
    {
        "name": "Item 5",
        "description": "Compact and portable, ideal for on-the-go use."
    },
    {
        "name": "Item 6",
        "description": "Stylish and elegant, designed to impress."
    },
    {
        "name": "Item 7",
        "description": "Affordable yet high-performing, great value for money."
    },
    {
        "name": "Item 8",
        "description": "Cutting-edge technology for a futuristic experience."
    },
    {
        "name": "Item 9",
        "description": "Versatile and adaptable, suitable for various needs."
    },
    {
        "name": "Item 10",
        "description": "User-friendly and intuitive, easy to operate."
    },
    {
        "name": "Item 11",
        "description": "Lightweight and ergonomic, designed for comfort."
    },
    {
        "name": "Item 12",
        "description": "High-performance and efficient, delivers excellent results."
    },
    {
        "name": "Item 13",
        "description": "Sleek and modern, add"
    },
    {
        "name": "Item 14",
        "description": "Robust and sturdy, b"
    },
    {
        "name": "Item 15",
        "description": "Energy-efficient and cost-effective, saves you money."
    },
    {
        "name": "Item 16",
        "description": "Innovative and creative, pushes the boundaries of design."
    },
    {
        "name": "Item 17",
        "description": "Compact and space-saving, perfect for small areas."
    },
    {
        "name": "Item 18",
        "description": "Premium materials and craftsmanship, ensures longevity."
    },
    {
        "name": "Item 19",
        "description": "Multifunctional and practical, serves multiple purposes."
    },
    {
        "name": "Item 20",
        "description": "Sleek and stylish, enhances your space."
    },
    {
        "name": "Item 21",
        "description": "High-quality and reliable, trusted by professionals."
    },
    {
        "name": "Item 22",
        "description": "Innovative and forward-thinking, sets new standards."
    },
    {
        "name": "Item 23",
        "description": "Efficient and powerful, delivers exceptional performance."
    },
    {
        "name": "Item 24",
        "description": "Esdfnsdf"
    }
]


// Custom debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Memoized List Component
const ListComp = memo(({ value, data }) => {
    return (
        <div>
            <ul>
                <li>{value}</li>
                <li>{ data}</li>
            </ul>
        </div>
    );
});

const ITEMS_PER_PAGE = 10;


function Loading() {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
}



const App = () => {
   // const [query, setQuery] = useState("");
   // const debouncedValue = useDebounce(query, 5000);

   /* useEffect(() => {
        if (debouncedQuery) {
            console.log("Fetching data for:", debouncedQuery);
            // Simulate API call
        }
    }, [debouncedQuery]);

    // Memoize the event handler
    const handleChange = useCallback((e) => {
        setQuery(e.target.value);
    }, []);
 
    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search"
                className="border p-2 rounded"
            />
            <ListComp value={debouncedValue} data='ddw' />
        </div>
    );*/
   

 
        const [page, setPage] = useState(1);
        const [loading, setLoading] = useState(false);
        const [items, setItems] = useState([]);

        // Use useRef for values that shouldn't trigger re-renders
        const loadingRef = useRef(loading);
        loadingRef.current = loading;

        // Memoize the fetchItems function
        const fetchItems = useCallback(async () => {
            setLoading(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newItems = data.slice(startIndex, endIndex);

            var c = false;
            if (items.length === 0) c = true;
            for (let i = 0; i < items.length; i++) {
                if (items[i].name !== newItems[i].name) {
                    c = true;
                    break;
                }
            }
            if (c) {
                setItems(prev => {

                    return [...prev, ...newItems];
                });
            }
            setLoading(false);
        }, [page]);

        // Memoize the scroll handler
        const handleScroll = useCallback(() => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 100 && !loadingRef.current) {
                setPage(prev => prev + 1);
            }
        }, []);

        // Effect for scroll listener
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [handleScroll]);

        // Effect for fetching items
        useEffect(() => {
            fetchItems();
        }, [fetchItems]);

        // Memoize the grid items to prevent unnecessary re-renders
        const gridItems = useMemo(() => (
            items.map(({ name, description }, index) => (
                <div key={`${name}-${index}`} className="p-4">
                    <Card name={name} description={description} />
                </div>
            ))
        ), [items]);

    return (

      
            <BrowserRouter>
                <Routes>
                    <Route path='/dark' element={
                    <Suspense fallback={<p>loading..</p>}>
                        <Dark/>
                    </Suspense>}
                     
                     />
                    <Route path="*" element={<p>Not Found.</p>} />
                </Routes>
            </BrowserRouter>
            /*
              <div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gridItems}
                </div>
                {loading && (
                    <div className="w-full text-center py-4">
                        <p>Loading...</p>
                    </div>
            )}
            </div>
        </div>*/
        );
};




export default memo(App);


const ROWS = 10;
const COLS = 10;

const Spreadsheet = () => {
    const [data, setData] = useState(() =>
        Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ''))
    );

    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

    // Handle cell value change
    const handleCellChange = (row, col, value) => {
        const newData = [...data];
        newData[row][col] = value;
        setData(newData);
    };

    // Handle drag and drop
    const handleDragStart = (e, row, col) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ row, col }));
    };

    const handleDrop = (e, targetRow, targetCol) => {
        e.preventDefault();
        const { row: sourceRow, col: sourceCol } = JSON.parse(e.dataTransfer.getData('text/plain'));

        const newData = [...data];
        const temp = newData[sourceRow][sourceCol];
        newData[sourceRow][sourceCol] = newData[targetRow][targetCol];
        newData[targetRow][targetCol] = temp;
        setData(newData);
    };

    // Parse and evaluate formulas
    const evaluateFormula = (value, row, col) => {
        if (value.startsWith('=')) {
            try {
                const formula = value.slice(1);
                if (formula.startsWith('SUM')) {
                    const range = formula.match(/\(([^)]+)\)/)[1];
                    const [start, end] = range.split(':');
                    const [startRow, startCol] = start.match(/\d+|\D+/g);
                    const [endRow, endCol] = end.match(/\d+|\D+/g);

                    let sum = 0;
                    for (let r = +startRow - 1; r < +endRow; r++) {
                        for (let c = startCol.charCodeAt(0) - 65; c <= endCol.charCodeAt(0) - 65; c++) {
                            sum += parseFloat(data[r][c]) || 0;
                        }
                    }
                    return sum;
                }
                // Add more formula support here (e.g., AVERAGE, etc.)
            } catch (e) {
                return '#ERROR';
            }
        }
        return value;
    };

    return (
        <div className="spreadsheet">
            {data.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            value={cell}
                            selected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                            onChange={handleCellChange}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                            evaluateFormula={evaluateFormula}
                            setSelectedCell={setSelectedCell}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const Cell = React.memo(({ row, col, value, selected, onChange, onDragStart, onDrop, evaluateFormula, setSelectedCell }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleClick = () => {
        setIsEditing(true);
        setSelectedCell({ row, col });
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(row, col, inputValue);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const displayValue = useMemo(() => evaluateFormula(value, row, col), [value, row, col, evaluateFormula]);

    return (
        <div
            className={`cell ${selected ? 'selected' : ''}`}
            onClick={handleClick}
            draggable
            onDragStart={(e) => onDragStart(e, row, col)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, row, col)}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                displayValue
            )}
        </div>
    );
});
