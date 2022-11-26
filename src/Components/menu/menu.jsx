import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div>
            <h1 style={{fontSize:'100px'}}>OX</h1>
            Menu
            <hr/>
            <Link to={'/game'}>Start Game</Link>
<br/>
            <Link to={'/listReplay'}>Replay</Link>

        </div>
    )
}
