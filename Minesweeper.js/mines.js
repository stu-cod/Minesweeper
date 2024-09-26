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
    var negs = getNegsCells(board, rowIdx, colIdx)
    var minesCount = 0
    for (var i = 0; i < negs.length; i++) {
        var currNeg = negs[i].cell
        if (currNeg.isMine) minesCount++
    }
    return minesCount
}

function showMineCell(cell, elCell) {
    if (!cell.isMine || cell.isShown) return
    //model
    gMineCells.explodeCount++
    cell.isShown = true
    //dom
    renderCell(cell, elCell)


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

