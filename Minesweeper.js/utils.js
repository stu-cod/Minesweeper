'use strict'

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getElCell(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    return elCell
}

function countMinesAroundCell(board, rowIdx, colIdx) {

    var minesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            if (board[i][j].isMine) minesCount++

        }
    }
    return minesCount
}

function hundleShowDom(elCell, i, j) {
    const cell = gBoard[i][j]
    if(!cell.isShown) return

        if (!cell.isMine) {
            elCell.innerText = cell.mineAroundCount
        if (cell.mineAroundCount === 0) elCell.innerText = EMPTY
    }
}