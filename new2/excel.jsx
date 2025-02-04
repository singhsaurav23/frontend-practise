import React, { useState, useCallback, useMemo } from 'react';
import './Spreadsheet.css';

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

    // Tokenize the formula
    const tokenizeFormula = (formula) => {
        return formula.match(/([A-Z]+\d+|\d+\.?\d*|[\+\-\*\/\(\)])/g) || [];
    };

    // Convert infix to postfix using Shunting Yard Algorithm
    const infixToPostfix = (tokens) => {
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const stack = [];
        const output = [];

        for (const token of tokens) {
            if (/[A-Z]+\d+|\d+\.?\d*/.test(token)) {
                // Cell reference or number
                output.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                stack.pop(); // Remove '('
            } else {
                // Operator
                while (
                    stack.length &&
                    precedence[stack[stack.length - 1]] >= precedence[token]
                ) {
                    output.push(stack.pop());
                }
                stack.push(token);
            }
        }

        while (stack.length) {
            output.push(stack.pop());
        }

        return output;
    };

    // Evaluate postfix expression
    const evaluatePostfix = (postfix, row, col) => {
        const stack = [];
        for (const token of postfix) {
            if (/[A-Z]+\d+/.test(token)) {
                // Cell reference (e.g., A1)
                const [colRef, rowRef] = token.match(/[A-Z]+|\d+/g);
                const cellRow = parseInt(rowRef) - 1;
                const cellCol = colRef.charCodeAt(0) - 65;
                const cellValue = parseFloat(data[cellRow][cellCol]) || 0;
                stack.push(cellValue);
            } else if (/\d+\.?\d*/.test(token)) {
                // Number
                stack.push(parseFloat(token));
            } else {
                // Operator
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                    default:
                        throw new Error(`Unknown operator: ${token}`);
                }
            }
        }
        return stack.pop();
    };

    // Evaluate formula
    const evaluateFormula = (value, row, col) => {
        if (value.startsWith('=')) {
            try {
                const formula = value.slice(1);
                const tokens = tokenizeFormula(formula);
                const postfix = infixToPostfix(tokens);
                return evaluatePostfix(postfix, row, col);
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

export default Spreadsheet;