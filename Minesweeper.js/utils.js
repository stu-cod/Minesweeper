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

function renderCell(cell, elCell) {

    
    elCell.classList.remove('cover')
    elCell.classList.remove('safe')

    if (!cell.isMine) {
        elCell.innerText = cell.mineAroundCount
        if (cell.mineAroundCount === 0) elCell.innerText = EMPTY
    }
    else {
        elCell.innerText = MINE
        elCell.classList.add('explode')
    }
}
function coverCell(cell, elCell) {
    elCell.classList.add('cover')
    elCell.innerText = EMPTY
    if (cell.isMine) elCell.classList.remove('explode')

}

function getNegsCells(board, rowIdx, colIdx) {
    var negs = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            var neg = {
                cell: board[i][j],
                i: i,
                j: j
            }
            negs.push(neg)
        }
    }
    return negs
}