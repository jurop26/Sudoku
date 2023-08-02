import { createBoard } from "./sudokulogic.js"

const boardElement = document.querySelector('.board')

const board = createBoard(9)

// Graficke vytvorenie hracej plochy
board.forEach(row => {
    row.forEach(tile => {
        // const number = getNumber()
        const element = document.createElement('div')
        element.textContent = tile.value
        boardElement.appendChild(element)
    })
})
