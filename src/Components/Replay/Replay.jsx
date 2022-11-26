import { all } from "axios";
import React, { useEffect, useState } from "react";
import Box from "../Gamepage/Box";
import { instance } from "../../../api";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Replay() {
    let { _id } = useParams();
    const navigate = useNavigate()
    const [field, setField] = useState('')
    const [history, setHistory] = useState([])
    const [stepNumber, setStepNumber] = useState()
    const [result, setResult] = useState('')
    const [ready, setReady] = useState(false)
    const boxs = history[stepNumber]
    let size = field === 9 ? 3 : field === 16 ? 4 : 5
    const grid = {
        gridTemplate: `repeat(${size}, 1fr) / repeat(${size}, 1fr)`
    }


    useEffect(() => {
        instance.get(`/getReplay/${_id}`).then(
            res => {
                console.log(res.data)
                setField(res.data.field)
                setStepNumber(res.data.lastMove -= 1)
                setResult(res.data.result)
                setHistory(res.data.history)
            }
        )
    }, [])
    useEffect(() => {
        if (boxs) {
            setReady(true)
        }
    }, [boxs])

    function jumpTo(step) {
        setStepNumber(step)
    }
    console.log(history.length)
    const renderMoves = () =>

        history.map((step, move) => {
            const lastMove = history.length - 1
            const target = move ? `Go to move : ${move}` : 'Start'
            return (
                move === lastMove ?
                    <li className="listHistory" key={move}>
                        <button className="historyButton" onClick={() => jumpTo(move)}> Last Move</button>
                    </li>
                    :
                    <li className="listHistory" key={move}>
                        <button className="historyButton" onClick={() => jumpTo(move)}> {target}</button>
                    </li>

            )
        })

    return (
        <div>
            <h1>Replay</h1>
            <h2>Size {size}X{size}</h2>
            <hr />
            <h2>{result === 'draw' ? 'Draw' : `Winner is ${result}`}</h2>
            <div style={{ display: 'flex' }}>
                <div style={grid} className="board" >

                    {ready ?
                        boxs.map((box, index) =>
                            <Box
                                key={index}
                                value={box}
                            />
                        ) : ''
                    }
                </div>
                <div>
                    <h1 style={{ marginTop: '0' }}>History</h1>
                    <hr />
                    {renderMoves()}
                </div>

            </div>
            <div className="m-5" >
                <Link to={'/listReplay'}>Back to List</Link>
            </div>
        </div>
    )
}
