import React, { useState } from "react";
import { Link } from "react-router-dom";
import Board from "./Board";
import './game.css'

export default function Field() {
    const [box, setBox] = useState(null)
    const [setting, setSetting] = useState(null)

    function handleSetFieldSize() {
        setSetting(box)
    }

    return (
        <div>

            {
                (setting) ?
                    < Board
                        size={setting}
                    />
                    : <div>
                        <h1>Field Size</h1>
                        {
                            (box) ? <h2>{box}x{box}</h2> : ''
                        }
                        <label>Select </label>
                        <input type='number' min={3} max={8} onChange={e => setBox(e.target.value)} />
                        <hr /><button
                            className="start-game"
                            onClick={handleSetFieldSize}
                        >
                            Start
                        </button><br />

                    </div>


            }
            <div className="m-5" >
                <Link to={'/'}>Back to Manu</Link>
            </div>
        </div>

    )
}