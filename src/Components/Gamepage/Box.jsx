import React from "react";
import './game.css'

export default function Box({onClick,value}) {
   
    return (

        <button
            className="box-ox"
            onClick={onClick}
        >
            {value}
        </button>

    )
}