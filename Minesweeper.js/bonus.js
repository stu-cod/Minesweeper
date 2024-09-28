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

//best score 
var player = {}


function displayBestPlayer() {

    const bestPlayerName = localStorage.getItem(`bestPlayerName${gLevel.difficulty}`)
    const bestPlayerTime = localStorage.getItem(`bestPlayerTime${gLevel.difficulty}`)

    const elBestName = document.querySelector('.best-name')
    const elBestTime = document.querySelector('.best-time')
    elBestName.innerText = bestPlayerName ? bestPlayerName : ''
    elBestTime.innerText = bestPlayerTime ? bestPlayerTime + 'sec' : ''

}

function SetNewBest() {

    player.time = +elTimer.innerText

    if (!checkBestTime()) return
    player.name = prompt('!!!you got the new best score!!! please type your name')
    localStorage.setItem(`bestPlayerName${gLevel.difficulty}`, player.name)
    localStorage.setItem(`bestPlayerTime${gLevel.difficulty}`, player.time)
}

function checkBestTime() {
    const currBestTime = localStorage.getItem(`bestPlayerTime${gLevel.difficulty}`)
    if (!currBestTime || player.time < currBestTime) return true
    return false
}

//safe click 
var safeClickCount
const elSafeClick = document.querySelector('.safe-button')

function safeClick() {
    if (!gGame.isOn || safeClickCount === 0) return
    safeClickCount--
    var cellPos = getSafeCell()
    var elCell = getElCell(cellPos.i, cellPos.j)

    elCell.classList.add('safe')
elSafeClick.innerText = `safe click ${safeClickCount}`

}

function getSafeCell() {
    var isSafe = false
    while (!isSafe) {
        var randomRowIdx = getRandomInt(0, gLevel.size)
        var randomColIdx = getRandomInt(0, gLevel.size)
        var cell = gBoard[randomRowIdx][randomColIdx]
        var cellPos = {
            i: randomRowIdx,
            j: randomColIdx
        }
        if ((!cell.isMine & !cell.isShown & !cell.isMarked)) {
            isSafe = true
            return cellPos
        }
    }
}









