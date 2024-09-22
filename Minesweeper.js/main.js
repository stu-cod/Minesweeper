'use strict'

var gBoard
var gLevel = {
    size: 4,
    mines: 2,
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

const MINE = '💣'
const MINEMARK = '#'
const EMPTY = ''
const MARK = '🚩'
function onInit() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    var boardSize = gLevel.size
    var board = []

    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                mineAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }
    }


    return board
}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        strHtml += '<tr>'
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]
            strHtml += `<td
             oncontextmenu="onCellMarked(this , event, ${i}, ${j})"
             onclick="onCellClicked(this, ${i}, ${j})"
             class="cell-${i}-${j} cover"></td>`
        }
        strHtml += '</tr>'
    }
    var elField = document.querySelector('.board-game')
    elField.innerHTML = strHtml
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]
            var currCellCount = countMinesAroundCell(board, i, j)
            //modal
            cell.mineAroundCount = currCellCount
        }
    }
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]

    if (!gGame.isOn) {
        createmines(i, j)
        setMinesNegsCount(gBoard)
    }
    gGame.isOn = true
    if(cell.isMarked) return
    //cell witout negs
    if (cell.mineAroundCount === 0 && !cell.isMine) expandShown(board, elCell, i, j)
    //cell with negs
    else if (!cell.isMine) {
        //modal
        gGame.shownCount++
        cell.isShown = true
        //dom
        elCell.classList.remove('cover')
    }
    //mine cell
    else {
        //modal
        if (!cell.isShown) gLevel.mines--
        cell.isShown = true
        //dom
        elCell.innerText = MINE
        elCell.classList.add('expload')
    }
    hundleShowDom(elCell, i, j)
}

function onCellMarked(elCell, ev, i, j) {
    if(!gGame.isOn) return
    ev.preventDefault()
    const cell = gBoard[i][j]

    if(!cell.isShown){
    //modal
    cell.isMarked = !cell.isMarked
    //dom
    elCell.innerText = cell.isMarked ?  MARK : EMPTY
    }
}

function checkGameOver() {

}

function expandShown(board, elCell, rowIdx, colIdx) {
    const cell = gBoard[rowIdx][colIdx]
    //modal
    gGame.shownCount++
    cell.isShown = true
    //dom
    elCell.classList.remove('cover')


    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            var negCell = board[i][j]

            if (!negCell.isShown && !negCell.isMarked) {
                //modal
                negCell.isShown = true
                gGame.shownCount++
                //dom
                var elNegCell = getElCell(i, j)
                elNegCell.classList.remove('cover')
                hundleShowDom(elNegCell, i, j)
                if (negCell.mineAroundCount === 0) expandShown(gBoard, elNegCell, i, j)
            }
        }
    }
}

function createmines(posI, posJ) {
    var minesCount = 0
    while (minesCount < gLevel.mines) {

        var randomRowIdx = getRandomInt(0, gLevel.size)
        var randomColIdx = getRandomInt(0, gLevel.size)
        var currCell = gBoard[randomRowIdx][randomColIdx]
        if (randomRowIdx === posI && randomColIdx === posJ || currCell.isMine) continue
        //modal
        currCell.isMine = true    
        minesCount++
    }


}

function onDifficultyClicked(elDifficulty) {
    if (elDifficulty.classList.contains('Beginner')) {
        gLevel.size = 4
        gLevel.mines = 2
    }
    if (elDifficulty.classList.contains('Medium')) {
        gLevel.size = 8
        gLevel.mines = 14
    }
    if (elDifficulty.classList.contains('Expert')) {
        gLevel.size = 12
        gLevel.mines = 32
    }
    onInit()

}



