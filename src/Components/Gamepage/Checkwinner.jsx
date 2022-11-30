export function CheckWinner(squares, field) {
    let lines = []
    let test = [Array(field).fill(null)]
    let check, check2 = 0
    for (let i = 0; i < Number(field); i++) {

        lines.push(Array(Number(field)).fill(null))
        for (let j = 0; j < Number(field); j++) {
            lines[i][j] = j + (Number(field) * i)
        }
    }

    for (let i = 0; i < Number(field); i++) {

        lines.push(Array(Number(field)).fill(null))
        for (let j = 0; j < Number(field); j++) {
            lines[i + Number(field)][j] = Number(field) * (j) + i
        }
    }
    for (let i = 0; i < 2; i++) {
        lines.push(Array(Number(field)).fill(null))
        for (let j = 0; j < Number(field); j++) {
            (i === 0) ?
                lines[i + (Number(field) * 2)][j] = (Number(field) + 1) * j
                :
                lines[i + (Number(field) * 2)][j] = (j + 1) * (Number(field) - 1)
        }
    }

    for (let i = 0; i < lines.length; i++) {
        check = 0
        check2 = 0
        // test = lines[i];
        // console.log(test)
        // if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //     return squares[a];
        // }
        for (let j = 0; j < Number(field); j++) {
            // return squares[lines[i][j]]
            if (squares[lines[i][j]] === 'X') {
                check = check + 1
            } else if (squares[lines[i][j]] === 'O') {
                check2 = check2 + 2
            }

            if (check === Number(field)) {
                return 'X';
            } else if (check2 === (Number(field) * 2)) {
                return 'O';
            }
        }
    }


    return null;


}