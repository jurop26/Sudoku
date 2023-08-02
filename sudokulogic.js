// Konstanta pre cisla na hracej ploche
const numbersScale = [1,2,3,4,5,6,7,8,9]

export function createBoard(boardSize){
    const board = []
    
    for (let y = 0; y < boardSize; y++){
        let row = []
        for (let x = 0; x < boardSize; x++){
            const number = getNumber(row, board)
            
            // Ak je number false, kombinacia cisel nebola vhodna pre ten riadok. Riadok sa maze a nakombinuje sa znova
            if (number === false) {
                row = []
                x = -1
                
            }
            // Ak je number cislo 1-9
            else {
                // Inicializacia objektu pre polia
                const tile = {
                    x,
                    y,
                    get position(){
                        return {x, y}
                    },
                    set number(value){
                        this.value = value
                    }
                }   
                // Nastavenie suradnic kazdeho pola a nastavenie hodnoty value 'cislo pre kazde pole'
                tile.x = x
                tile.y = y
                tile.number = number
                // Uspesne pridanie pola do riadku
                row.push(tile)
            }
        }
        // Pridanie riadku do hracej plochy
        board.push(row)
    }
    return board
}

function getNumber(array, board){
    
    // Odfiltrovanie uz pouzitych cislev riadku 'row'
    let availableNumbers = numbersScale.filter(n => !array.find(e => e.value === n))
    
    while(availableNumbers.length > 0) {
        let index = randomNumber(availableNumbers.length)
        let number = availableNumbers[index]
        
        // Kontrola podmienok pre stlpce a dane kocky
        if/*(check(number, array) || */(checkColumn(number, array, board) || checkSquare(number, array, board)) {
            availableNumbers.splice(index, 1)
            continue   
        }
        return number
    }
    return false
}

// Nahodne cislo podla potreby - Range
function randomNumber(range){
    return (Math.floor(Math.random() * range))
}

// Kontrola duplicity cisla v riadku
function check(number, array){
    return array.some(e => e.value === number)
}

// kontrola duplicity cisla v stlpci
function checkColumn(number, array, board){
    return board.some(obj => obj.findIndex(e => e.value === number) === array.length)
}

// Kontrola duplicity cisla v danom stvorci
function checkSquare(number, array, board){
    const {x,y} = squareNo(array.length, board.length)
    const square = []

    for(let offSetX = -1; offSetX <= 1; offSetX++)
        for(let offSetY = -1; offSetY <= 1; offSetY++) {
            const tile = board[x + offSetX]?.[y + offSetY]?.value
            if(tile) square.push(tile)
        }
    return square.includes(number)
}

// Vrati vychodziu hodnotu 'polohu' na kontrolu daneho stvorca
function squareNo(row, board) {
    let result = {}

    if (board <= 2 && row <= 2) result = {x: 1, y: 1}
    if (board <= 2 && 2 < row && row <= 5) result = {x: 1, y: 4}
    if (board <= 2 && 5 < row && row <= 8) result = {x: 1, y: 7}

    if (2 < board && board <= 5 && row <= 2) result = {x: 4, y: 1}
    if (2 < board && board <= 5 && 2 < row && row <= 5) result = {x: 4, y: 4}
    if (2 < board && board <= 5 && 5 < row && row <= 8) result = {x: 4, y: 7}

    if (5 < board && board <= 8 && row <= 2) result = {x: 7, y: 1}
    if (5 < board && board <= 8 && 2 < row && row <= 5) result = {x: 7, y: 4}
    if (5 < board && board <= 8 && 5 < row && row <= 8) result = {x: 7, y: 7}

    return result
}


