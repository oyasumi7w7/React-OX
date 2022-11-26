import { all } from "axios";
import React, { useEffect, useState } from "react";
import { CheckWinner } from "./Checkwinner";
import Box from "./Box";

export default function Board(props) {
    // const [size, setSize] = useState([])
    // const [boxs, setBox] = useState([])
    let field = props.size * props.size
    const [history, setHistory] = useState([Array(field).fill(null)])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXisNext] = useState(true)
    const winner = CheckWinner(history[stepNumber], props.size)
    const XO = xIsNext ? 'X' : 'O'
    const boxs = history[stepNumber]

    const grid = {
        gridTemplate: `repeat(${props.size}, 1fr) / repeat(${props.size}, 1fr)`
    }

console.log(history)

    // useEffect(() => {
    //     setSize([])
    //     let number = props.size * props.size

    //     for (let i = 1; i <= number; i++) {
    //         setSize(size => [...size, { position: i, pos: i }])
    //     }

    // }, [])

    // function splitIntoChunks(array, chunk) {
    //     let chunks = [], i = 0, n = array.length;
    //     while (i < n) {
    //         chunks.push(array.slice(i, i += Number(chunk)));
    //     }
    //     return chunks;
    // }

    // useEffect(() => {
    //     if (size[0]) {
    //         const splitedSize = splitIntoChunks(size, props.size)
    //         setBox(splitedSize)
    //     }

    // }, [size])

    function handleClick(i) {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        console.log(current)
console.log(squares)
        if (winner || squares[i]) return;
        squares[i] = XO
        setHistory([...historyPoint, squares])
        setStepNumber(historyPoint.length)
        setXisNext(!xIsNext)
    }

    function jumpTo(step) {
        setStepNumber(step)
        setXisNext(step % 2 === 0)
    }

    const renderMoves = () =>
        history.map((step, move) => {
            const target = move ?`Go to move : ${move}` : 'Start'
            return (
               
                <li className="listHistory" key={move}>
                    <button className="historyButton" onClick={() => jumpTo(move)}> {target}</button>
                </li>

            )
        })


    return (
        <div>
            <h1>Board</h1>
            <h2>Size {props.size}X{props.size}</h2>
            <hr/>
            <h2>{winner ? `Winner is ${winner}` : `Next Player is ${XO}`}</h2>
            <div style={{ display: 'flex' }}>
                <div style={grid} className="board" >
                    {
                        boxs.map((box, index) =>
                            <Box
                                key={index}
                                onClick={() => handleClick(index)}
                                value={box}
                            />
                        )
                    }
                </div>
                <div>
                    <h1 style={{ marginTop: '0' }}>History</h1>
                    <hr />
                    {renderMoves()}
                </div>
            </div>


        </div>
    )
}
