'use strict'
//second delivery - game basic functions and data update done (only timer left and game end modal)
//TODO - for tomorrow # timer #modal, go over game functions again and look for mistakes


var gBoard
var gGame = {}
var gLevel = {
    size: 4,
    mines: 2,
}

const elModal = document.querySelector('.game-over-modal')
const EMPTY = ''

//////////////////////////////////////////////////////////////////

function onInit() {
    clearInterval(gTimerIntrval)
    clearInterval(gStartTime)
    gMineCells = {
        explodeCount: 0,
        markedCount: 0,
        mines: []
    }
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    setData()
    elModal.classList.add('hide')
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
//////////////////////////////////////////////////////////////////

function onCellClicked(elCell, i, j) {
    
    const cell = gBoard[i][j]

    if (!gGame.isOn) {
        createmines(i, j)
        setMinesNegsCount(gBoard)
        startTimer()
    }
    gGame.isOn = true
    console.log('gMineCells:', gMineCells)
    if (cell.isMarked || cell.isShown) return

    //cell witout negs
    expandShown(gBoard, elCell, i, j)
    //cell with negs
    showNumCell(cell, elCell)
    //mine cell
    showMineCell(cell, elCell)

    updateData()
    gameOver()
}

function expandShown(board, elCell, rowIdx, colIdx) {
    const cell = board[rowIdx][colIdx]
    if (cell.mineAroundCount !== 0 || cell.isMine) return

    if (!cell.isShown) {
        //model
        gGame.shownCount++
        cell.isShown = true
        //dom
        elCell.classList.remove('cover')
    }

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            var negCell = board[i][j]

            if (!negCell.isMarked && !negCell.isShown) {
                //model
                negCell.isShown = true
                gGame.shownCount++
                //dom
                var elNegCell = getElCell(i, j)
                elNegCell.classList.remove('cover')
                renderCell(negCell, elNegCell)
                if (negCell.mineAroundCount === 0) expandShown(gBoard, elNegCell, i, j)
            }

        }
    }
}

function showNumCell(cell, elCell) {
    if (cell.isMine || cell.mineAroundCount === 0) return
    //model
    gGame.shownCount++
    cell.isShown = true
    //dom
    elCell.classList.remove('cover')
    renderCell(cell, elCell)
}

function onCellMarked(elCell, ev, i, j) {
    if (!gGame.isOn) return
    ev.preventDefault()
    const cell = gBoard[i][j]
    markCell(cell, elCell)

}

function markCell(cell, elCell) {
    if (!cell.isShown) {
        //modal
        cell.isMarked = !cell.isMarked
        // if (cell.isMine) gMineCells.markedCount++

        //dom
        elCell.innerText = cell.isMarked ? FLAG : EMPTY

        markedCount(cell)
        updateData()
        gameOver()
    }


}

//////////////////////////////////////////////////////////////////

function gameOver() {
    if (!isWin() && !isLose()) return
    var modalStr
    if (isLose()) {
        const mines = gMineCells.mines
        for (var i = 0; i < mines.length; i++) {
            var posI = mines[i].i
            var posJ = mines[i].j
            const mine = gBoard[posI][posJ]
            const elMine = getElCell(posI, posJ)
            showMineCell(mine, elMine)
            modalStr = 'you lost, better luck next time!'


        }
    }
    if (isWin()) modalStr = '!!!!win!!!!!'
    clearInterval(gTimerIntrval)
    showModal(modalStr)
    gGame.isOn = false
}

function isWin() {
    const MineCellCount = gLevel.mines - gMineCells.explodeCount
    const nonMineCellCount = gLevel.size ** 2 - gLevel.mines
    
    if (gMineCells.markedCount === MineCellCount) return true
    return false
}

function isLose() {
    if (gMineCells.explodeCount === 3) return true
    return false
}

function showModal(msg) {
    const elModalMsg = document.querySelector('.modal-msg')
    elModal.classList.remove('hide')
    elModalMsg.innerText = msg
}
//////////////////////////////////////////////////////////////////

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
