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

    if (!cell.isShown) return

    if (!cell.isMine) {
        elCell.innerText = cell.mineAroundCount
        if (cell.mineAroundCount === 0) elCell.innerText = EMPTY
    }
}

