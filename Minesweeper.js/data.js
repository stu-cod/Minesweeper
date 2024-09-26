'use strict'

const FLAG = '🚩'
const LIFE = '👼'
const DEATH = '☠️'
const WINSMILLEY = '🤩'
const HAPPYSMILEY = '😊'
const NORMALSMILEY = '😐'
const SCAREDSMILEY = '😧'
const EXPLAODESMILEY = '🤯'


const elLife = document.querySelector('.life')
const elSmiley = document.querySelector('.smiley')
const elFlag = document.querySelector('.flag')
const elTimer = document.querySelector('.timer')
var gStartTime
var gTimerIntrval

//DATA
function setData() {

    elLife.innerText = `LIVES: ${LIFE} ${LIFE} ${LIFE}`
    elSmiley.innerText = HAPPYSMILEY
    elFlag.innerText = FLAG + gLevel.mines
}
function updateData() {

    if (gMineCells.explodeCount === 1) {
        elLife.innerText = `LIVES: ${LIFE} ${LIFE} ${DEATH}`
        elSmiley.innerText = NORMALSMILEY
    }
    if (gMineCells.explodeCount === 2) {
        elLife.innerText = `LIVES: ${LIFE} ${DEATH} ${DEATH}`
        elSmiley.innerText = SCAREDSMILEY
    }
    if (gMineCells.explodeCount === 3) {
        elLife.innerText = `LIVES: ${DEATH} ${DEATH} ${DEATH}`
        elSmiley.innerText = EXPLAODESMILEY
    }
    if (isWin()) elSmiley.innerText = WINSMILLEY
    elFlag.innerText = FLAG + (gLevel.mines - gGame.markedCount)

}
function markedCount(cell) {
    if (cell.isMarked) gGame.markedCount++
    if (!cell.isMarked) gGame.markedCount--
    if (cell.isMarked && cell.isMine) gMineCells.markedCount++
    if (!cell.isMarked && cell.isMine) gMineCells.markedCount++
}


//TIMER
function startTimer() {
    gStartTime = Date.now()

    gTimerIntrval = setInterval(() => {
        const start = Date.now() - gStartTime
        const formattedTime = formatTime(start)
        elTimer.innerText = formattedTime


    }, 1000)
}
function formatTime(ms) {
    var seconds = Math.floor((ms % 1000000) / 1000);
    return `${padTime(seconds)}`
}
function padTime(val) {
    return String(val).padStart(3, '0')
}

