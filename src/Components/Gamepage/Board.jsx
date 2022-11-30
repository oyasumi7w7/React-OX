import { all } from "axios";
import React, { useEffect, useState } from "react";
import { CheckWinner } from "./Checkwinner";
import Box from "./Box";
import { instance } from "../../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {test} from './test'
export default function Board(props) {
    // const [size, setSize] = useState([])
    // const [boxs, setBox] = useState([])
    const navigate = useNavigate()
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

    const ahlgo = test(props.size)

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
            const lastMove = history.length - 1
            const target = move ? `Go to move : ${move}` : 'Start'
            return (
                move === field ?
                    <li className="listHistory" key={move}>
                        <button className="historyButton" onClick={() => jumpTo(move)}> Last Move</button>
                    </li>
                    : winner ?
                        move === lastMove
                            ?
                            <li className="listHistory" key={move}>
                                <button className="historyButton" onClick={() => jumpTo(move)}> Last Move</button>
                            </li>
                            :
                            <li className="listHistory" key={move}>
                                <button className="historyButton" onClick={() => jumpTo(move)}> {target}</button>
                            </li>
                        :
                        <li className="listHistory" key={move}>
                            <button className="historyButton" onClick={() => jumpTo(move)}> {target}</button>
                        </li>

            )
        })

    function handleSave() {
        const data = {
            history: history,
            result: winner ? winner : 'Draw',
            field: props.size,
            lastMove: history.length
        }
        instance.post('/saveReplay', data).then(
            res => {
                if (res.data === 'Done') {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Save completed.',
                    }).then(() => {
                        navigate('/')
                    })
                }
            }
        ).catch(function (error) {
            console.log(error.toJSON());
        });
    }

    return (
        <div>
            <h1>Board</h1>
            <h2>Size {props.size}X{props.size}</h2>
            <hr />
            <h2>{winner ? `Winner is ${winner}` : stepNumber === field ? 'Draw' : `Next Player is ${XO}`}</h2>
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
            {winner ? <button style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '10px' }} onClick={handleSave}>Save</button> :
                stepNumber === field ? <button style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '10px' }} onClick={handleSave}>Save</button> : ''}

        </div>
    )
}
