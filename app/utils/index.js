import { store } from '../containers/Root'

export const rand = () =>
  Math.round(Math.random() - 0.25)

export const newBoard = (x, y) => {
  const newBoard = {}

  for (let i = 0; i < y; i++) {
  let boardRow = {}
  for (let j = 0; j < x; j++)
    boardRow[j] = 0

  newBoard[i] = boardRow
}
 return newBoard
}

export const fillBoard = (x, y) => {
  const currentBoard = store.getState().board,
        newBoard = JSON.parse(JSON.stringify(currentBoard)),
        oldHeight = Object.keys(currentBoard).length,
        xObj = currentBoard[0],
        oldWidth = Object.keys(xObj).length

  if (y < oldHeight && x < oldWidth) {
    for (let i = y; i < oldHeight; i++ )
      delete newBoard[i]

    for (let i = 0; i < y; i++)
      for (let j = x; j < oldWidth; j++)
        delete newBoard[i][j]

  } else if (x < oldWidth) {
    for (let i = 0; i < y; i++)
      for (let j = x; j < oldWidth; j++)
        delete newBoard[i][j]

  } else if (y == oldHeight && x > oldWidth) {
    for (let i = 0; i < oldHeight; i++)
      for (let j = oldWidth; j < x; j++)
        newBoard[i][j] = 0

  } else {
     for (let i = oldHeight; i < y; i++ ) {
       newBoard[i] = {}

       for (let j = 0; j < x; j++)
         newBoard[i][j] = 0
     }

    for (let i = 0; i < oldWidth; i++)
      for (let j = oldWidth; j < x; j++)
        newBoard[i][j] = 0
  }

  return newBoard
}

export const createBoard = (y, x) => {
  const newBoard = {}

  for (let i = 0; i < y; i++) {
  let boardRow = {}
  for (let j = 0; j < x; j++)
    boardRow[j] = rand()

  newBoard[i] = boardRow
}
 return newBoard
}

export const updateBoard = (oldBoard) => {
  const newBoard = JSON.parse(JSON.stringify(oldBoard)),
        rows = Object.keys(oldBoard).length,
        xObj = oldBoard[0],
        columns = Object.keys(xObj).length

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const neighbors = calcNeighbors(y, x)

      if (neighbors == 2 || neighbors == 3) {
        if (oldBoard[y][x]) {
          newBoard[y][x] = 2
        } else if (neighbors == 3) {
          newBoard[y][x] = 1
        }


      } else if (oldBoard[y][x] && (neighbors < 2 || neighbors > 3)) {
        newBoard[y][x] = 0
      }
    }
  }

  function calcNeighbors(oY, oX) {
    const directions = [
      [-1,  0], // N
      [-1,  1], // NE
      [ 0,  1], // E
      [ 1,  1], // SE
      [ 1,  0], // S
      [ 1, -1], // SW
      [ 0, -1], // W
      [-1, -1]  // NW
    ]
    let neighbs = 0

    for (let i = 0; i < 8; i++) {
      let nY = oY + directions[i][0],
          nX = oX + directions[i][1]

      if (nY >= rows)    nY = 0
      if (nY < 0)        nY = rows - 1
      if (nX >= columns) nX = 0
      if (nX < 0)        nX = columns - 1

      if (oldBoard[nY][nX])
        neighbs += 1
    }

    return neighbs
  }

  return newBoard
}
