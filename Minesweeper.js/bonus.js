'use strict'

//Full Expand

function expandShown(board, elCell, rowIdx, colIdx) {
    const cell = board[rowIdx][colIdx]
    const negs = getNegsCells(board, rowIdx, colIdx)
    if (cell.mineAroundCount !== 0 || cell.isMine) return

    if (!cell.isShown) {
        //model
        gGame.shownCount++
        cell.isShown = true
        //dom
        renderCell(cell, elCell)
    }
    for (var i = 0; i < negs.length; i++) {
        var negCell = negs[i].cell

        if (!negCell.isMarked && !negCell.isShown) {
            //model
            negCell.isShown = true
            gGame.shownCount++
            //dom
            var elNegCell = getElCell(negs[i].i, negs[i].j)
            renderCell(negCell, elNegCell)
            if (negCell.mineAroundCount === 0) expandShown(gBoard, elNegCell, negs[i].i, negs[i].j)
        }

    }
}


//HINTS
var hints = []
var hintMode = false


function onHintClick(elHint) {
    if (elHint.classList.contains('use') || hintMode || !gGame.isOn) return
    elHint.classList.add('use')
    hintMode = true


}

function hint(board, i, j, elCell) {
    expose(board, i, j, elCell)
    setTimeout(unExpose, 1000, board, i, j, elCell)
    hintMode = false
}

function unExpose(board, i, j, elCell) {
    const cell = board[i][j]
    const negs = getNegsCells(board, i, j)

    coverCell(cell, elCell)
    for (var i = 0; i < negs.length; i++) {
        var currNeg = negs[i].cell
        if (currNeg.isShown) continue

        var elNegCell = getElCell(negs[i].i, negs[i].j)
        coverCell(currNeg, elNegCell)
    }


}

function expose(board, i, j, elCell) {
    const cell = board[i][j]
    const negs = getNegsCells(board, i, j)

    renderCell(cell, elCell)
    for (var i = 0; i < negs.length; i++) {
        var currNeg = negs[i].cell
        if (currNeg.isShown) continue
        var elNegCell = getElCell(negs[i].i, negs[i].j)
        renderCell(currNeg, elNegCell)
    }
}










