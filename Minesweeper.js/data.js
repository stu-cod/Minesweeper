'use strict'


const LIFE = '👼'
const DEATH = '☠️'
const HAPPYSMILEY = '😊'
const NORMALSMILEY = '😐'
const SCAREDSMILEY = '😧'
const EXPLAODESMILEY = '🤯'
const elLife = document.querySelector('.life')
const elSmiley = document.querySelector('.smiley')

var gStartTime
var gTimerIntrval

function setData() {
    elLife.innerText = `LIVES: ${LIFE} ${LIFE} ${LIFE}`
    elSmiley.innerText = HAPPYSMILEY
}

function updateData() {
if(gGame.explodeCount === 1) {
    elLife.innerText = `LIVES: ${LIFE} ${LIFE} ${DEATH}`
    elSmiley.innerText = NORMALSMILEY
}
if(gGame.explodeCount === 2) {
    elLife.innerText = `LIVES: ${LIFE} ${DEATH} ${DEATH}`
    elSmiley.innerText = SCAREDSMILEY
}
if(gGame.explodeCount === 3) {
    elLife.innerText = `LIVES: ${DEATH} ${DEATH} ${DEATH}`
    elSmiley.innerText = EXPLAODESMILEY
}
}

