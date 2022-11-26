import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api";

export default function ListReplay() {
    const [lists, setList] = useState([])
    useEffect(() => {
        instance.get('listReplay').then(
            res =>
                setList(res.data)
        )
    }, [])

    return (
        <div>
            <h1>List</h1><hr />
            <table>
                <thead>
                    <tr>
                        <th>
                            Size Field
                        </th>
                        <th>
                            result
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lists.map((game, index) =>

                            <tr key={index}>
                                <td>
                                    {game.field === 9 ? "3X3" : game.field === 16 ? "4X4" : '5X5'}
                                </td>
                                <td>
                                    {game.result === 'draw' ? <h3>Draw</h3> : `Winner is ${game.result}`}
                                </td>
                                <td>
                                    <Link to={`/replay/${game._id}`}>Replay</Link>
                                </td>
                            </tr>

                        )
                    }
                </tbody>
            </table>
            <div className="m-5" >
                <Link to={'/'}>Back to Manu</Link>
            </div>
        </div>
    )
}