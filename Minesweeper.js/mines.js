'use strict'

const MINE = '💣'
var gMineCells = []

function createmines(posI, posJ) {

    var minesCount = 0
    while (minesCount < gLevel.mines) {

        var randomRowIdx = getRandomInt(0, gLevel.size)
        var randomColIdx = getRandomInt(0, gLevel.size)
        var currCell = gBoard[randomRowIdx][randomColIdx]
        if (randomRowIdx === posI && randomColIdx === posJ || currCell.isMine) continue
        var mine = {
            i: randomRowIdx,
            j: randomColIdx
        }
        gMineCells.mines.push(mine)
        //model
        currCell.isMine = true
        minesCount++
    }
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

function showMineCell(cell, elCell) {
    if (!cell.isMine || cell.isShown) return
    //model
    gMineCells.explodeCount++
    cell.isShown = true
    //dom
    elCell.innerText = MINE
    elCell.classList.add('explode')


}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]
            var currCellCount = countMinesAroundCell(board, i, j)
            //model
            cell.mineAroundCount = currCellCount
        }
    }
}

