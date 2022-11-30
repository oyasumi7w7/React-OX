export function test(size) {
    let list = []
    for (let i = 0; i < Number(size); i ++) {

        list.push(Array(Number(size)).fill(null))
        for (let j = 0; j < Number(size);j++) {
            list[i][j] = j+(Number(size)*i)
        }
    }

    for (let i = 0; i < Number(size); i ++) {

        list.push(Array(Number(size)).fill(null))
        for (let j = 0; j < Number(size);j++) {
            list[i+Number(size)][j] = Number(size)*(j)+i
        }
    }
    for (let i = 0; i < 2 ; i ++) {
        list.push(Array(Number(size)).fill(null))
        for (let j = 0; j < Number(size);j++) {
            (i===0)?
            list[i+(Number(size)*2)][j] =(Number(size)+1)*j
            :
            list[i+(Number(size)*2)][j] =(j+1)*(Number(size)-1)
        }
    }
    

    return list;
}